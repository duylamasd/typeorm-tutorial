import {MigrationInterface, QueryRunner} from "typeorm";

export class cascade1548736864191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `message` CHANGE `expiryDate` `expiryDate` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `message` CHANGE `expiryDate` `expiryDate` datetime(0) NOT NULL");
    }

}
