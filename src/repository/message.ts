import { EntityRepository, getConnection } from 'typeorm';
import { BaseRepositories } from '../utils';
import {
  Message,
  User,
  ReminderFrequency,
  MessageRecipient
} from '../entity';

/**
 * Message repository
 * @extends BaseRepositories.BaseTreeRepository<Message>
 */
@EntityRepository(Message)
export class MessageRepository extends BaseRepositories.BaseTreeRepository<Message> {

  isReminder(id: string): Promise<boolean> {
    return this.findOne(id)
      .then((msg: Message) => msg.isReminder);
  }

  getNextRemindDate(id: string): Promise<Date> {
    return this.findOne(id)
      .then((msg: Message) => msg.nextRemindDate);
  }

  getExpiryDate(id: string): Promise<Date> {
    return this.findOne(id)
      .then((msg: Message) => msg.expiryDate);
  }

  getCreator(id: string): Promise<User> {
    return this.findOne(id)
      .then(async (msg: Message) => {
        return await msg.creator;
      });
  }

  getReminderFrequency(id: string): Promise<ReminderFrequency> {
    return this.findOne(id)
      .then(async (msg: Message) => {
        return await msg.reminderFrequency;
      });
  }

  getMessageRecipients(id: string, skip?: number, limit?: number): Promise<MessageRecipient[]> {
    return getConnection()
      .createQueryBuilder(MessageRecipient, 'mr')
      .where('mr.messageId = :messageId', { messageId: id })
      .offset(skip)
      .limit(limit)
      .getMany();
  }

  getParentMessage(id: string): Promise<Message> {
    return this.findOne(id)
      .then(async (msg: Message) => {
        return await msg.parentMessage;
      });
  }

  async getChildrenMessages(id: string, skip?: number, limit?: number): Promise<Message[]> {
    let message: Message = await this.findOne(id);
    return await this.createDescendantsQueryBuilder('message', 'messageClosure', message)
      .skip(skip)
      .limit(limit)
      .getMany();
  }
}
