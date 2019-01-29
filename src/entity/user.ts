import {
  Column,
  Entity,
  Index,
  OneToMany
} from "typeorm";
import { BaseEntity } from "../utils";
import { UserGroup } from "./user-group";
import { Message } from "./message";
import { MessageRecipient } from "./message-recipient";

/**
 * User entity
 * @extends BaseEntity
 * @property  {string}                      firstName
 * @property  {string}                      middleName
 * @property  {string}                      lastName
 * @property  {boolean}                     isActive
 * @property  {Promise<UserGroup[]>}        userGroups
 * @property  {Promise<Message[]>}          messages
 * @property  {Promise<MessageRecipient[]}  messageRecipients
 */
@Entity()
@Index("I001", ["firstName", "lastName"])
@Index("I002", ["firstName", "middleName", "lastName"], {
  unique: true
})
export class User extends BaseEntity {

  @Column({
    type: "varchar",
    length: 50,
    nullable: false
  })
  firstName: string;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false
  })
  middleName: string;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false
  })
  lastName: string;

  @Column({
    type: "tinyint",
    nullable: false,
    default: true
  })
  isActive: boolean;

  @OneToMany(type => UserGroup, userGroup => userGroup.user)
  userGroups: Promise<UserGroup[]>;

  @OneToMany(type => Message, message => message.creator)
  messages: Promise<Message[]>;

  @OneToMany(type => MessageRecipient, messageRecipient => messageRecipient.recipient)
  messageRecipients: Promise<MessageRecipient[]>;
}
