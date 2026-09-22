import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from '../config/database.config';
import logger from '../utils/logger.util';

async function runMigration() {
  try {
    logger.info('Initializing DataSource for Group Pricing migration...');
    await AppDataSource.initialize();

    const tables = ['tours', 'treks', 'expeditions'];

    for (const table of tables) {
      const columns: { Field: string }[] = await AppDataSource.query(`DESCRIBE \`${table}\`;`);
      const existingFields = columns.map((c) => c.Field);

      if (!existingFields.includes('group_pricing_enabled')) {
        logger.info(`Adding group_pricing_enabled column to ${table}...`);
        await AppDataSource.query(
          `ALTER TABLE \`${table}\` ADD COLUMN \`group_pricing_enabled\` TINYINT(1) NOT NULL DEFAULT 0;`,
        );
        logger.info(`Added group_pricing_enabled to ${table}.`);
      } else {
        logger.info(`Column group_pricing_enabled already exists on ${table}.`);
      }

      if (!existingFields.includes('group_pricing')) {
        logger.info(`Adding group_pricing column to ${table}...`);
        await AppDataSource.query(
          `ALTER TABLE \`${table}\` ADD COLUMN \`group_pricing\` JSON NULL;`,
        );
        logger.info(`Added group_pricing to ${table}.`);
      } else {
        logger.info(`Column group_pricing already exists on ${table}.`);
      }
    }

    logger.info('Group Pricing database schema migration completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Error executing group pricing migration:', error);
    process.exit(1);
  }
}

runMigration();
