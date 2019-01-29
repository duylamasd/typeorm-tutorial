import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { BaseEntity } from "../utils";
import { User } from "./user";
import { Group } from "./group";
import { MessageRecipient } from "./message-recipient";

/**
 * UserGroup entity
 * @extends   BaseEntity
 * @property  {string}                      userId
 * @property  {string}                      groupId
 * @property  {boolean}                     isActive
 * @property  {Promise<User>}               user
 * @property  {Promise<Group>}              group
 * @property  {Promise<MessageRecipient[]>} messageRecipients
 */
@Entity()
@Index("I004", ["userId"])
@Index("I005", ["groupId"])
@Index("I006", ["userId", "groupId"], {
  unique: true
})
export class UserGroup extends BaseEntity {

  @Column({
    type: "uuid",
    nullable: false
  })
  userId: string;

  @Column({
    type: "uuid",
    nullable: false
  })
  groupId: string;

  @Column({
    type: "tinyint",
    nullable: false,
    default: true
  })
  isActive: boolean;

  @ManyToOne(type => User)
  @JoinColumn({
    name: "userId",
    referencedColumnName: "id"
  })
  user: Promise<User>;

  @ManyToOne(type => Group)
  @JoinColumn({
    name: "groupId",
    referencedColumnName: "id"
  })
  group: Promise<Group>;

  @OneToMany(type => MessageRecipient, messageRecipient => messageRecipient.recipientGroup)
  messageRecipients: Promise<MessageRecipient[]>;
}
