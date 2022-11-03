import { MigrationInterface, QueryRunner } from "typeorm";

export class tabelasDoAddressSemRelacionamento1667495287906 implements MigrationInterface {
    name = 'tabelasDoAddressSemRelacionamento1667495287906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "road" character varying(100) NOT NULL, "number" character varying(50) NOT NULL, "complement" character varying(120) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_9034683839599c80ebe9ebb0891" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Address"`);
    }

}
