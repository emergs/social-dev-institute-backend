import { MigrationInterface, QueryRunner } from "typeorm";

export class fixTablesCampaignsInstitution1667593106470 implements MigrationInterface {
    name = 'fixTablesCampaignsInstitution1667593106470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "homeless" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "age" character varying(3) NOT NULL, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), "picture" text, "institutionId" uuid, CONSTRAINT "PK_61c61bccb04a730339fbb73b56e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "institutions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "cnpj" character varying(18) NOT NULL, "address" character varying(150) NOT NULL, "phone" character varying(11) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(60) NOT NULL, CONSTRAINT "UQ_9e970cb85e04351d5eb97f41f59" UNIQUE ("cnpj"), CONSTRAINT "UQ_8d110b8f5288cfb6d0e10d938cb" UNIQUE ("email"), CONSTRAINT "PK_0be7539dcdba335470dc05e9690" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "isAlive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "date_creation" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "date_update" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "institutionId" uuid`);
        await queryRunner.query(`ALTER TABLE "homeless" ADD CONSTRAINT "FK_068d87e9f0dc8a0473d59edb9e8" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_1ec4b0f32baa39f0f578b071e49" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_1ec4b0f32baa39f0f578b071e49"`);
        await queryRunner.query(`ALTER TABLE "homeless" DROP CONSTRAINT "FK_068d87e9f0dc8a0473d59edb9e8"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "institutionId"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "date_update"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "date_creation"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "isAlive"`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`DROP TABLE "institutions"`);
        await queryRunner.query(`DROP TABLE "homeless"`);
    }

}
