import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { BaseEntity } from "../utils";
import { User } from "./user";
import { UserGroup } from "./user-group";
import { Message } from "./message";

/**
 * Message recipient entity
 * @extends   BaseEntity
 * @property  {string}              recipientId
 * @property  {string}              recipientGroupId
 * @property  {string}              messageId
 * @property  {boolean}             isRead
 * @property  {Promise<User>}       recipient
 * @property  {Promise<UserGroup>}  recipientGroup
 * @property  {Promise<Message>}    message
 */
@Entity()
@Index("I013", ["recipientId"])
@Index("I014", ["recipientGroupId"])
@Index("I015", ["messageId"])
@Index("I016", ["recipientId", "recipientGroupId", "messageId"])
export class MessageRecipient extends BaseEntity {

  @Column({
    type: "uuid",
    nullable: true
  })
  recipientId: string;

  @Column({
    type: "uuid",
    nullable: true
  })
  recipientGroupId: string;

  @Column({
    type: "uuid",
    nullable: false
  })
  messageId: string;

  @Column({
    default: true,
    type: "tinyint",
    nullable: false
  })
  isRead: boolean;

  @ManyToOne(type => User, { nullable: true })
  @JoinColumn({
    name: "recipientId",
    referencedColumnName: "id"
  })
  recipient: Promise<User>;

  @ManyToOne(type => UserGroup, { nullable: true })
  @JoinColumn({
    name: "recipientGroupId",
    referencedColumnName: "id"
  })
  recipientGroup: Promise<UserGroup>;

  @ManyToOne(type => Message)
  @JoinColumn({
    name: "messageId",
    referencedColumnName: "id"
  })
  message: Promise<Message>;
}
