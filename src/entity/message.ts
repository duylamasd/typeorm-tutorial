import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm';
import { BaseEntity } from '../utils';
import { User } from './user';
import { MessageRecipient } from './message-recipient';
import { ReminderFrequency } from './reminder-frequency';

/**
 * Message entity
 * @extends   BaseEntity
 * @property  {string}                        subject
 * @property  {string}                        creatorId
 * @property  {string}                        body
 * @property  {string}                        parentMessageId
 * @property  {Date}                          expiryDate
 * @property  {boolean}                       isReminder
 * @property  {Date}                          nextRemindDate
 * @property  {string}                        reminderFrequencyId
 * @property  {Promise<User>}                 creator
 * @property  {Promise<ReminderFrequency>}    reminderFrequency
 * @property  {Promise<MessageRecipient[]>}   messageRecipients
 * @property  {Promise<Message[]>}            chldrenMessages
 * @property  {Promise<Message>}              parentMessage
 */
@Entity()
@Tree('materialized-path')
@Index('I008', ['subject'])
@Index('I009', ['creatorId'])
@Index('I010', ['parentMessageId'])
@Index('I011', ['reminderFrequencyId'])
@Index('I012', ['subject', 'creatorId', 'parentMessageId', 'reminderFrequencyId'])
export class Message extends BaseEntity {

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  subject: string;

  @Column({
    type: 'uuid',
    nullable: false
  })
  creatorId: string;

  @Column({
    type: 'text',
    nullable: false
  })
  body: string;

  @Column({
    type: 'uuid',
    nullable: true
  })
  parentMessageId: string;

  @Column({
    type: 'datetime',
    nullable: false
  })
  expiryDate: Date;

  @Column({
    default: false,
    type: 'tinyint',
    nullable: false
  })
  isReminder: boolean;

  @Column({
    type: 'date',
    nullable: true
  })
  nextRemindDate: Date;

  @Column({
    type: 'uuid',
    nullable: true
  })
  reminderFrequencyId: string;

  @ManyToOne(type => User)
  @JoinColumn({
    name: 'creatorId',
    referencedColumnName: 'id'
  })
  creator: Promise<User>;

  @ManyToOne(type => ReminderFrequency, { nullable: true })
  @JoinColumn({
    name: 'reminderFrequencyId',
    referencedColumnName: 'id'
  })
  reminderFrequency: Promise<ReminderFrequency>;

  @OneToMany(type => MessageRecipient, messageRecipient => messageRecipient.message)
  messageRecipients: Promise<MessageRecipient[]>;

  @TreeChildren()
  chldrenMessages: Promise<Message[]>;

  @TreeParent()
  parentMessage: Promise<Message>;
}
