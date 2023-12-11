import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMovieProducerTable1700431986772
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table if not exists movie_producer (
            id integer primary key,
            movie_id integer not null,
            producer_id integer not null,
            foreign key (movie_id) references movie (id),
            foreign key (producer_id) references producer (id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table movie_producer`);
  }
}
