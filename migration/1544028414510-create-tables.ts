import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1544028414510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `message_recipient` (`id` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `recipientId` varchar(255) NULL, `recipientGroupId` varchar(255) NULL, `messageId` varchar(255) NOT NULL, `isRead` tinyint NOT NULL DEFAULT 1, INDEX `I016` (`recipientId`, `recipientGroupId`, `messageId`), INDEX `I015` (`messageId`), INDEX `I014` (`recipientGroupId`), INDEX `I013` (`recipientId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `reminder_frequency` (`id` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `title` varchar(25) NOT NULL, `frequency` tinyint NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, INDEX `I007` (`title`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `message` (`id` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `subject` varchar(100) NOT NULL, `creatorId` varchar(255) NOT NULL, `body` text NOT NULL, `parentMessageId` varchar(255) NULL, `expiryDate` datetime NOT NULL, `isReminder` tinyint NOT NULL DEFAULT 0, `nextRemindDate` date NULL, `reminderFrequencyId` varchar(255) NULL, `mpath` varchar(255) NULL DEFAULT '', INDEX `I012` (`subject`, `creatorId`, `parentMessageId`, `reminderFrequencyId`), INDEX `I011` (`reminderFrequencyId`), INDEX `I010` (`parentMessageId`), INDEX `I009` (`creatorId`), INDEX `I008` (`subject`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `firstName` varchar(50) NOT NULL, `middleName` varchar(50) NOT NULL, `lastName` varchar(50) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX `I002` (`firstName`, `middleName`, `lastName`), INDEX `I001` (`firstName`, `lastName`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_group` (`id` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` varchar(255) NOT NULL, `groupId` varchar(255) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX `I006` (`userId`, `groupId`), INDEX `I005` (`groupId`), INDEX `I004` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `group` (`id` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(50) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX `I003` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `message_recipient` ADD CONSTRAINT `FK_fc0dc993e08a92c7d79983b1564` FOREIGN KEY (`recipientId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `message_recipient` ADD CONSTRAINT `FK_871eab69e5015d4e35be2cd73b0` FOREIGN KEY (`recipientGroupId`) REFERENCES `user_group`(`id`)");
        await queryRunner.query("ALTER TABLE `message_recipient` ADD CONSTRAINT `FK_f52dd89cfd53deb9c4d89be526b` FOREIGN KEY (`messageId`) REFERENCES `message`(`id`)");
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_e04040c4ea7133eeddefff6417d` FOREIGN KEY (`creatorId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_22b520c555ce3c3d0531079c57a` FOREIGN KEY (`reminderFrequencyId`) REFERENCES `reminder_frequency`(`id`)");
        await queryRunner.query("ALTER TABLE `message` ADD CONSTRAINT `FK_575b24e003b8881e64fa53cd16d` FOREIGN KEY (`parentMessageId`) REFERENCES `message`(`id`)");
        await queryRunner.query("ALTER TABLE `user_group` ADD CONSTRAINT `FK_3d6b372788ab01be58853003c93` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `user_group` ADD CONSTRAINT `FK_31e541c93fdc0bb63cfde6549b7` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_group` DROP FOREIGN KEY `FK_31e541c93fdc0bb63cfde6549b7`");
        await queryRunner.query("ALTER TABLE `user_group` DROP FOREIGN KEY `FK_3d6b372788ab01be58853003c93`");
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_575b24e003b8881e64fa53cd16d`");
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_22b520c555ce3c3d0531079c57a`");
        await queryRunner.query("ALTER TABLE `message` DROP FOREIGN KEY `FK_e04040c4ea7133eeddefff6417d`");
        await queryRunner.query("ALTER TABLE `message_recipient` DROP FOREIGN KEY `FK_f52dd89cfd53deb9c4d89be526b`");
        await queryRunner.query("ALTER TABLE `message_recipient` DROP FOREIGN KEY `FK_871eab69e5015d4e35be2cd73b0`");
        await queryRunner.query("ALTER TABLE `message_recipient` DROP FOREIGN KEY `FK_fc0dc993e08a92c7d79983b1564`");
        await queryRunner.query("DROP INDEX `I003` ON `group`");
        await queryRunner.query("DROP TABLE `group`");
        await queryRunner.query("DROP INDEX `I004` ON `user_group`");
        await queryRunner.query("DROP INDEX `I005` ON `user_group`");
        await queryRunner.query("DROP INDEX `I006` ON `user_group`");
        await queryRunner.query("DROP TABLE `user_group`");
        await queryRunner.query("DROP INDEX `I001` ON `user`");
        await queryRunner.query("DROP INDEX `I002` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP INDEX `I008` ON `message`");
        await queryRunner.query("DROP INDEX `I009` ON `message`");
        await queryRunner.query("DROP INDEX `I010` ON `message`");
        await queryRunner.query("DROP INDEX `I011` ON `message`");
        await queryRunner.query("DROP INDEX `I012` ON `message`");
        await queryRunner.query("DROP TABLE `message`");
        await queryRunner.query("DROP INDEX `I007` ON `reminder_frequency`");
        await queryRunner.query("DROP TABLE `reminder_frequency`");
        await queryRunner.query("DROP INDEX `I013` ON `message_recipient`");
        await queryRunner.query("DROP INDEX `I014` ON `message_recipient`");
        await queryRunner.query("DROP INDEX `I015` ON `message_recipient`");
        await queryRunner.query("DROP INDEX `I016` ON `message_recipient`");
        await queryRunner.query("DROP TABLE `message_recipient`");
    }

}
