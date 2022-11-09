import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterandoARotaDeCampanhas1667995291192 implements MigrationInterface {
    name = 'AlterandoARotaDeCampanhas1667995291192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" ADD "campaignsIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" ADD CONSTRAINT "FK_0a07935c4a48f539d1f7ddb5010" FOREIGN KEY ("campaignsIdId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" DROP CONSTRAINT "FK_0a07935c4a48f539d1f7ddb5010"`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" DROP COLUMN "campaignsIdId"`);
    }

}
