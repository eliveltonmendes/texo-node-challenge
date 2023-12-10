import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateProducerTable1700431970237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`create table if not exists producer (
            id integer primary key,
            name character varying not null
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table producer`);
    }
}
