import { MigrationInterface, QueryRunner } from "typeorm";

export class homelessInstitutionRelation1667584311222 implements MigrationInterface {
    name = 'homelessInstitutionRelation1667584311222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "institutions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "cnpj" character varying(18) NOT NULL, "address" character varying(150) NOT NULL, "phone" character varying(11) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(60) NOT NULL, CONSTRAINT "UQ_9e970cb85e04351d5eb97f41f59" UNIQUE ("cnpj"), CONSTRAINT "UQ_8d110b8f5288cfb6d0e10d938cb" UNIQUE ("email"), CONSTRAINT "PK_0be7539dcdba335470dc05e9690" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "institutionId" uuid`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "created_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "updated_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "picture" text`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD CONSTRAINT "FK_068d87e9f0dc8a0473d59edb9e8" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homeless" DROP CONSTRAINT "FK_068d87e9f0dc8a0473d59edb9e8"`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "picture" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP COLUMN "institutionId"`);
        await queryRunner.query(`DROP TABLE "institutions"`);
    }

}
