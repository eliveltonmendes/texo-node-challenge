import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMovieStudioTable1702062590487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table movie_studio (
            id integer primary key AUTOINCREMENT,
            movie_id integer not null,
            studio_id integer not null,
            foreign key (movie_id) references movie (id),
            foreign key (studio_id) references studio (id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table movie_studio`);
  }
}
