import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMovieTable1700427766371 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table if not exists movie (
            id integer primary key,
            year number not null,
            title character varying not null,
            winner boolean default false
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table movie`);
  }
}
