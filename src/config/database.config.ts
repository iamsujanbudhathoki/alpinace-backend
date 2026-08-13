import { DataSource } from 'typeorm';
import { DotenvConfig } from './env.config';



export const AppDataSource = new DataSource({
  type: 'postgres',
  url: DotenvConfig.DATABASE_URL,
  entities: [`${__dirname}/../entities/**/*.entity.{ts,js}`],
  synchronize: DotenvConfig.NODE_ENV === 'DEVELOPMENT',
});


