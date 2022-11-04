import { MigrationInterface, QueryRunner } from "typeorm";

export class homelessMigration1667493072854 implements MigrationInterface {
    name = 'homelessMigration1667493072854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "homeless" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "age" character varying(3) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "picture" character varying(250) NOT NULL, CONSTRAINT "PK_61c61bccb04a730339fbb73b56e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "homeless"`);
    }

}
