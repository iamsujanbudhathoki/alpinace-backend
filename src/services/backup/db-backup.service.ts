import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { R2Util } from '../../utils/r2.util';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditEntityType } from '../../constants/audit.constants';

export interface BackupResult {
  success: boolean;
  timestamp: string;
  schemaUrl?: string;
  dataUrl?: string;
  schemaKey?: string;
  dataKey?: string;
  message: string;
}

@autoInjectable()
export class DbBackupService {
  constructor(
    private auditLogService: AuditLogService = new AuditLogService(),
  ) {}

  /**
   * Generates Schema SQL & Data SQL dumps and uploads them to Cloudflare R2
   */
  async runBackup(): Promise<BackupResult> {
    const timestamp = new Date().toISOString();
    const formattedDate = new Date()
      .toISOString()
      .replace(/[:.]/g, '-')
      .slice(0, 16);
    const monthDir = new Date().toISOString().slice(0, 7); // e.g. 2026-08

    console.log(`[DB Backup] Starting daily automated database backup (${timestamp})...`);

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    try {
      // 1. Get list of tables
      const tablesResult: any[] = await AppDataSource.query('SHOW TABLES');
      const tableNames: string[] = tablesResult
        .map((r) => Object.values(r)[0] as string)
        .filter(Boolean);

      if (tableNames.length === 0) {
        throw new Error('No database tables found for backup.');
      }

      // 2. Build Schema SQL Dump
      let schemaSql = `-- AlpineAce Database Schema Dump\n`;
      schemaSql += `-- Timestamp: ${timestamp}\n`;
      schemaSql += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;

      for (const table of tableNames) {
        const createResult: any[] = await AppDataSource.query(
          `SHOW CREATE TABLE \`${table}\``,
        );
        if (createResult && createResult[0]) {
          const createTableSql =
            createResult[0]['Create Table'] ||
            createResult[0]['Create View'] ||
            Object.values(createResult[0])[1];
          schemaSql += `DROP TABLE IF EXISTS \`${table}\`;\n`;
          schemaSql += `${createTableSql};\n\n`;
        }
      }
      schemaSql += `SET FOREIGN_KEY_CHECKS = 1;\n`;

      // 3. Build Data/Values SQL Dump
      let dataSql = `-- AlpineAce Database Values/Data Dump\n`;
      dataSql += `-- Timestamp: ${timestamp}\n`;
      dataSql += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;

      for (const table of tableNames) {
        const rows: any[] = await AppDataSource.query(`SELECT * FROM \`${table}\``);
        if (rows.length === 0) continue;

        dataSql += `-- Table data for \`${table}\` (${rows.length} rows)\n`;

        // Chunk insert statements into batches of 100 rows
        const chunkSize = 100;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const chunk = rows.slice(i, i + chunkSize);
          const columns = Object.keys(chunk[0])
            .map((col) => `\`${col}\``)
            .join(', ');

          const valueLines = chunk.map((row) => {
            const values = Object.values(row).map((val) => this.formatSqlValue(val));
            return `(${values.join(', ')})`;
          });

          dataSql += `INSERT INTO \`${table}\` (${columns}) VALUES\n${valueLines.join(',\n')};\n\n`;
        }
      }
      dataSql += `SET FOREIGN_KEY_CHECKS = 1;\n`;

      // 4. Upload to Cloudflare R2
      const schemaKey = `backups/${monthDir}/schema-${formattedDate}.sql`;
      const dataKey = `backups/${monthDir}/values-${formattedDate}.sql`;

      let schemaUrl = '';
      let dataUrl = '';

      if (R2Util.isConfigured()) {
        const schemaBuffer = Buffer.from(schemaSql, 'utf-8');
        const dataBuffer = Buffer.from(dataSql, 'utf-8');

        schemaUrl = await R2Util.upload(schemaKey, schemaBuffer, 'application/sql');
        dataUrl = await R2Util.upload(dataKey, dataBuffer, 'application/sql');

        console.log(`[DB Backup] Uploaded Schema SQL: ${schemaUrl}`);
        console.log(`[DB Backup] Uploaded Values SQL: ${dataUrl}`);
      } else {
        console.warn(
          '[DB Backup] Cloudflare R2 credentials not set. Backup generated locally in memory.',
        );
      }

      await this.auditLogService.log({
        action: 'SYSTEM_BACKUP',
        entityType: AuditEntityType.SETTING,
        metadata: { schemaKey, dataKey, schemaUrl, dataUrl, tableCount: tableNames.length },
      });

      return {
        success: true,
        timestamp,
        schemaUrl: schemaUrl || undefined,
        dataUrl: dataUrl || undefined,
        schemaKey,
        dataKey,
        message: 'Daily database schema and values backup completed successfully.',
      };
    } catch (err: any) {
      console.error('[DB Backup] Backup generation failed:', err);
      return {
        success: false,
        timestamp,
        message: err?.message || 'Database backup failed.',
      };
    }
  }

  /**
   * Formats JavaScript runtime values into MySQL compliant literal values
   */
  private formatSqlValue(val: any): string {
    if (val === null || val === undefined) {
      return 'NULL';
    }
    if (typeof val === 'number') {
      return String(val);
    }
    if (typeof val === 'boolean') {
      return val ? '1' : '0';
    }
    if (val instanceof Date) {
      return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
    }
    if (typeof val === 'object') {
      const jsonStr = JSON.stringify(val);
      return `'${this.escapeString(jsonStr)}'`;
    }
    return `'${this.escapeString(String(val))}'`;
  }

  /**
   * Escapes single quotes and special characters for raw SQL values
   */
  private escapeString(str: string): string {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\0/g, '\\0')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\x1a/g, '\\Z');
  }
}
