import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { DotenvConfig } from '../../config/env.config';
import { R2Util } from '../../utils/r2.util';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditEntityType } from '../../constants/audit.constants';

export interface BackupResult {
  success: boolean;
  timestamp: string;
  schemaKey?: string;
  dataKey?: string;
  message: string;
}

@autoInjectable()
export class DbBackupService {
  constructor(
    private auditLogService: AuditLogService = new AuditLogService(),
  ) { }

  /**
   * Generates Schema & Values SQL dumps and uploads them to Cloudflare R2
   */
  async runBackup(): Promise<BackupResult> {
    const timestamp = new Date().toISOString();
    const dateStr = timestamp.slice(0, 10); // e.g. 2026-08-31
    console.log(`[DB Backup] Starting automated backup for ${dateStr}...`);

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    try {
      const tablesResult: any[] = await AppDataSource.query('SHOW TABLES');
      const tables: string[] = tablesResult.map((r) => Object.values(r)[0] as string).filter(Boolean);

      if (tables.length === 0) {
        throw new Error('No database tables found for backup.');
      }

      // Generate Schema SQL and Data/Values SQL Dumps
      const schemaSql = await this.generateSchemaSql(tables);
      const dataSql = await this.generateDataSql(tables);

      // Private bucket path: private/backups/YYYY-MM-DD/
      const schemaKey = `private/backups/${dateStr}/schema.sql`;
      const dataKey = `private/backups/${dateStr}/values.sql`;
      const backupBucket = DotenvConfig.R2_BACKUP_BUCKET_NAME || DotenvConfig.R2_BUCKET_NAME;

      if (R2Util.isConfigured()) {
        await R2Util.upload(schemaKey, Buffer.from(schemaSql, 'utf-8'), 'application/sql', backupBucket);
        await R2Util.upload(dataKey, Buffer.from(dataSql, 'utf-8'), 'application/sql', backupBucket);
        console.log(`[DB Backup] Uploaded R2 (${backupBucket}): ${schemaKey} & ${dataKey}`);
      } else {
        console.warn('[DB Backup] Cloudflare R2 credentials not configured.');
      }

      await this.auditLogService.log({
        action: 'SYSTEM_BACKUP',
        entityType: AuditEntityType.SETTING,
        metadata: { schemaKey, dataKey, tableCount: tables.length },
      });

      return {
        success: true,
        timestamp,
        schemaKey,
        dataKey,
        message: `Database backup uploaded successfully to ${dateStr}/`,
      };
    } catch (err: any) {
      console.error('[DB Backup] Error:', err);
      return {
        success: false,
        timestamp,
        message: err?.message || 'Database backup failed.',
      };
    }
  }

  private async generateSchemaSql(tables: string[]): Promise<string> {
    let sql = `-- AlpineAce Database Schema Dump\n`;
    sql += `-- Generated At: ${new Date().toISOString()}\n\n`;
    sql += `SET NAMES utf8mb4;\n`;
    sql += `SET FOREIGN_KEY_CHECKS = 0;\n`;
    sql += `SET UNIQUE_CHECKS = 0;\n\n`;

    for (const t of tables) {
      const res: any[] = await AppDataSource.query(`SHOW CREATE TABLE \`${t}\``);
      if (res && res[0]) {
        const createSql = res[0]['Create Table'] || res[0]['Create View'] || Object.values(res[0])[1];
        sql += `DROP TABLE IF EXISTS \`${t}\`;\n${createSql};\n\n`;
      }
    }

    sql += `SET FOREIGN_KEY_CHECKS = 1;\n`;
    sql += `SET UNIQUE_CHECKS = 1;\n`;
    return sql;
  }

  private async generateDataSql(tables: string[]): Promise<string> {
    let sql = `-- AlpineAce Database Values Dump\n`;
    sql += `-- Generated At: ${new Date().toISOString()}\n\n`;
    sql += `SET NAMES utf8mb4;\n`;
    sql += `SET FOREIGN_KEY_CHECKS = 0;\n`;
    sql += `SET UNIQUE_CHECKS = 0;\n\n`;

    for (const t of tables) {
      const rows: any[] = await AppDataSource.query(`SELECT * FROM \`${t}\``);
      if (rows.length === 0) continue;

      const cols = Object.keys(rows[0]).map((c) => `\`${c}\``).join(', ');

      // Batch inserts into chunks of 100 rows for memory safety & MySQL max_allowed_packet compliance
      const chunkSize = 100;
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const valStrings = chunk.map((r) => `(${Object.values(r).map((v) => this.sqlEscape(v)).join(', ')})`);
        sql += `INSERT INTO \`${t}\` (${cols}) VALUES\n${valStrings.join(',\n')};\n\n`;
      }
    }

    sql += `SET FOREIGN_KEY_CHECKS = 1;\n`;
    sql += `SET UNIQUE_CHECKS = 1;\n`;
    return sql;
  }

  private sqlEscape(val: any): string {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'number') return String(val);
    if (typeof val === 'boolean') return val ? '1' : '0';
    if (Buffer.isBuffer(val)) return `X'${val.toString('hex')}'`;
    if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
    const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
    return `'${str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\0/g, '\\0').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\x1a/g, '\\Z')}'`;
  }
}
