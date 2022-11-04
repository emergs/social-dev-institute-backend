import { MigrationInterface, QueryRunner } from "typeorm";

export class createTablesCampaigns1667504311462 implements MigrationInterface {
    name = 'createTablesCampaigns1667504311462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Address" ADD "campaignsId" uuid`);
        await queryRunner.query(`ALTER TABLE "Address" ADD CONSTRAINT "FK_e52ede3ee52d1e5f3ae247fa7ef" FOREIGN KEY ("campaignsId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Address" DROP CONSTRAINT "FK_e52ede3ee52d1e5f3ae247fa7ef"`);
        await queryRunner.query(`ALTER TABLE "Address" DROP COLUMN "campaignsId"`);
        await queryRunner.query(`DROP TABLE "campaigns"`);
    }

}
