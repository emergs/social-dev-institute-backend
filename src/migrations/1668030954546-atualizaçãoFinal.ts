import { MigrationInterface, QueryRunner } from "typeorm";

export class atualizaçãoFinal1668030954546 implements MigrationInterface {
    name = 'atualizaçãoFinal1668030954546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" DROP CONSTRAINT "FK_1d9a1813f26a200578d626d4063"`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" ADD "campaignsIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" ADD CONSTRAINT "FK_1d9a1813f26a200578d626d4063" FOREIGN KEY ("volunteerIdId") REFERENCES "volunteers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" ADD CONSTRAINT "FK_0a07935c4a48f539d1f7ddb5010" FOREIGN KEY ("campaignsIdId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" DROP CONSTRAINT "FK_0a07935c4a48f539d1f7ddb5010"`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" DROP CONSTRAINT "FK_1d9a1813f26a200578d626d4063"`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" DROP COLUMN "campaignsIdId"`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" ADD CONSTRAINT "FK_1d9a1813f26a200578d626d4063" FOREIGN KEY ("volunteerIdId") REFERENCES "volunteers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
