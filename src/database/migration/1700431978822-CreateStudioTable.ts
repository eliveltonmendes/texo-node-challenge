import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStudioTable1700431978822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table if not exists studio (
            id integer primary key AUTOINCREMENT,
            name character varying not null
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table studio`);
  }
}
