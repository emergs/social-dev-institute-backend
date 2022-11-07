import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableInstitutions1667566810582 implements MigrationInterface {
    name = 'createTableInstitutions1667566810582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "institutions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "cnpj" character varying(14) NOT NULL, "address" character varying(150) NOT NULL, "phone" character varying(11) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(60) NOT NULL, CONSTRAINT "UQ_9e970cb85e04351d5eb97f41f59" UNIQUE ("cnpj"), CONSTRAINT "UQ_8d110b8f5288cfb6d0e10d938cb" UNIQUE ("email"), CONSTRAINT "PK_0be7539dcdba335470dc05e9690" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "created_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "updated_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "picture" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "picture" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "institutions"`);
    }

}
