import {
  Column,
  Entity,
  Index,
  OneToMany
} from 'typeorm';
import { BaseEntity } from '../utils';
import { Message } from './message';

/**
 * Reminder frequency entity
 * @extends BaseEntity
 */
@Entity()
@Index('I007', ['title'])
export class ReminderFrequency extends BaseEntity {

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false
  })
  title: string;

  @Column({
    type: 'tinyint',
    nullable: false
  })
  frequency: number;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: true
  })
  isActive: boolean;

  @OneToMany(type => Message, message => message.reminderFrequency)
  messages: Promise<Message[]>;
}
