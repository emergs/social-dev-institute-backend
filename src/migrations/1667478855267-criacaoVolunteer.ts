import { MigrationInterface, QueryRunner } from "typeorm";

export class criacaoVolunteer1667478855267 implements MigrationInterface {
    name = 'criacaoVolunteer1667478855267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "volunteer_campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "volunteerIdId" uuid, CONSTRAINT "PK_d7b58e94f8aadf0a2f39f88acd1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "volunteers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "cpf" character varying(11) NOT NULL, "email" character varying(60) NOT NULL, "age" character varying(3) NOT NULL, "telephone" character varying(11) NOT NULL, "password" character varying(60) NOT NULL, CONSTRAINT "PK_f4e65e37cf47256e3f580ecee62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" ADD CONSTRAINT "FK_1d9a1813f26a200578d626d4063" FOREIGN KEY ("volunteerIdId") REFERENCES "volunteers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "volunteer_campaigns" DROP CONSTRAINT "FK_1d9a1813f26a200578d626d4063"`);
        await queryRunner.query(`DROP TABLE "volunteers"`);
        await queryRunner.query(`DROP TABLE "volunteer_campaigns"`);
    }

}
