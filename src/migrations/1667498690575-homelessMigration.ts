import { MigrationInterface, QueryRunner } from "typeorm";

export class homelessMigration1667498690575 implements MigrationInterface {
    name = 'homelessMigration1667498690575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homeless" ALTER COLUMN "picture" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "homeless" ALTER COLUMN "picture" SET NOT NULL`);
    }

}
