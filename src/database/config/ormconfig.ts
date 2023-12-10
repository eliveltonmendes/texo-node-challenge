import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/sqlite.db',
  synchronize: true, // Obs: use synchronize: true somente em desenvolvimento.
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['dist/database/migration/*.js'],
  migrationsRun: true,
};
