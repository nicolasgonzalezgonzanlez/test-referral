import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnDescriptionToApplicationSetting1650513736366 implements MigrationInterface {
    name = 'AddColumnDescriptionToApplicationSetting1650513736366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_setting" ADD "description" character varying(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application_setting" DROP COLUMN "description"`);
    }

}
