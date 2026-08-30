import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { DotenvConfig } from '../config/env.config';

export class R2Util {
  private static client: S3Client | null = null;

  /**
   * Check if Cloudflare R2 credentials and bucket are configured in .env
   */
  static isConfigured(): boolean {
    return Boolean(
      DotenvConfig.R2_ACCOUNT_ID &&
        DotenvConfig.R2_ACCESS_KEY_ID &&
        DotenvConfig.R2_SECRET_ACCESS_KEY &&
        DotenvConfig.R2_BUCKET_NAME,
    );
  }

  /**
   * Get or initialize the S3Client configured for Cloudflare R2
   */
  private static getClient(): S3Client {
    if (!this.client) {
      const accountId = DotenvConfig.R2_ACCOUNT_ID;
      this.client = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: DotenvConfig.R2_ACCESS_KEY_ID,
          secretAccessKey: DotenvConfig.R2_SECRET_ACCESS_KEY,
        },
      });
    }
    return this.client;
  }

  /**
   * Upload a file buffer directly to Cloudflare R2
   * @param key S3 object key (e.g. `uploads/172387123-photo.webp`)
   * @param buffer File data buffer
   * @param contentType MIME type of the file
   * @returns The public HTTPS URL of the uploaded asset
   */
  static async upload(
    key: string,
    buffer: Buffer,
    contentType: string,
    bucketName?: string,
  ): Promise<string> {
    const client = this.getClient();
    const cleanKey = key.replace(/^\/+/, ''); // Remove leading slash
    const targetBucket = bucketName || DotenvConfig.R2_BUCKET_NAME;

    const command = new PutObjectCommand({
      Bucket: targetBucket,
      Key: cleanKey,
      Body: buffer,
      ContentType: contentType,
    });

    await client.send(command);

    // Build public URL using configured R2_PUBLIC_DOMAIN or Cloudflare R2 dev domain
    let publicDomain = DotenvConfig.R2_PUBLIC_DOMAIN?.replace(/\/$/, '');
    if (!publicDomain) {
      publicDomain = `https://${DotenvConfig.R2_BUCKET_NAME}.${DotenvConfig.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
    }

    return `${publicDomain}/${cleanKey}`;
  }

  /**
   * Delete an object from Cloudflare R2
   * @param key S3 object key or full R2 URL
   */
  static async delete(keyOrUrl: string): Promise<boolean> {
    if (!this.isConfigured() || !keyOrUrl) return false;

    try {
      let key = keyOrUrl;

      // If a full URL was passed, extract the relative key
      if (keyOrUrl.startsWith('http://') || keyOrUrl.startsWith('https://')) {
        const parsed = new URL(keyOrUrl);
        key = parsed.pathname.replace(/^\/+/, '');
      } else {
        key = key.replace(/^\/+/, '');
      }

      const client = this.getClient();
      const command = new DeleteObjectCommand({
        Bucket: DotenvConfig.R2_BUCKET_NAME,
        Key: key,
      });

      await client.send(command);
      return true;
    } catch (err) {
      console.warn(`[Cloudflare R2] Failed to delete object ${keyOrUrl}:`, err);
      return false;
    }
  }
}
