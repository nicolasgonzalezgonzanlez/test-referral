import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUserCode1650659299437 implements MigrationInterface {
    name = 'CreateTableUserCode1650659299437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_code" ("user_code_id" integer NOT NULL, "code" character varying(200) NOT NULL, "row_status" boolean, "created_by" character varying(100) NOT NULL, "updated_by" character varying(100), "create_date" TIMESTAMP NOT NULL, "updated_date" TIMESTAMP, CONSTRAINT "PK_569d107b8b58c1824d37b581b1a" PRIMARY KEY ("user_code_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_code"`);
    }

}
