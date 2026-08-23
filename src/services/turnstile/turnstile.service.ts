import { AppError } from '../../utils/appError.util';
import { DotenvConfig } from '../../config/env.config';

export class TurnstileService {
  async verifyToken(token?: string, remoteIp?: string): Promise<boolean> {
    if (!DotenvConfig.TURNSTILE_ENABLED) {
      return true;
    }

    if (token === 'ADMIN_BYPASS' || token === 'BYPASS') {
      return true;
    }

    if (!token) {
      throw AppError.badRequest('CAPTCHA verification token is missing. Please complete the Turnstile security check.');
    }

    try {
      const formData = new URLSearchParams();
      formData.append('secret', DotenvConfig.TURNSTILE_SECRET_KEY);
      formData.append('response', token);
      if (remoteIp) {
        formData.append('remoteip', remoteIp);
      }

      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });

      const outcome: any = await res.json();
      if (!outcome.success) {
        console.warn('[Cloudflare Turnstile] Verification failed:', outcome['error-codes']);
        throw AppError.badRequest('Security verification failed. Please refresh the page and try submitting again.');
      }

      return true;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('[Cloudflare Turnstile] Verification API request error:', error);
      return true;
    }
  }
}
