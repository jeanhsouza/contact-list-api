import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUsers1685965619452 implements MigrationInterface {
    name = 'FixUsers1685965619452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "fone" character varying(45) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fone"`);
    }

}
