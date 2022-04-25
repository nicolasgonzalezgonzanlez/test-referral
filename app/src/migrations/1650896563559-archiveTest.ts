import { MigrationInterface, QueryRunner } from "typeorm";

export class archiveTest1650896563559 implements MigrationInterface {
    name = 'archiveTest1650896563559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "application_setting" ("keys" character varying(200) NOT NULL, "value" character varying(200) NOT NULL, "type_key" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, "row_status" boolean, "created_by" character varying(100) NOT NULL, "updated_by" character varying(100), "create_date" TIMESTAMP NOT NULL, "updated_date" TIMESTAMP, CONSTRAINT "PK_7b0e8477137190d6a7a1bc6df6d" PRIMARY KEY ("keys"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "application_setting"`);
    }

}
