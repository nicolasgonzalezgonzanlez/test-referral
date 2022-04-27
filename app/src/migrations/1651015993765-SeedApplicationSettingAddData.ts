import { MigrationInterface, QueryRunner } from "typeorm"
import { ApplicationSettingSeed } from "./seeds/ApplicationSettingSeed";
import { applicationSettingEntity } from "../infraestructure/schemas";

export class SeedApplicationSettingAddData1651015993765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {        
        const repository = queryRunner.manager.getRepository(applicationSettingEntity); 
        await repository.save(ApplicationSettingSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
