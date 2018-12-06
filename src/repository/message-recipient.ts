import { EntityRepository } from 'typeorm';
import { BaseRepositories } from '../utils';
import {
  MessageRecipient,
  User,
  Message,
  UserGroup
} from '../entity';

/**
 * Message recipient repository
 * @extends BaseRepositories.BaseRepository<MessageRecipient>
 */
@EntityRepository(MessageRecipient)
export class MessageRecipientRepository extends BaseRepositories.BaseRepository<MessageRecipient> {

  getUser(id: string): Promise<User> {
    return this.findOne(id)
      .then(async (msg: MessageRecipient) => {
        return await msg.recipient;
      });
  }

  getMessage(id: string): Promise<Message> {
    return this.findOne(id)
      .then(async (msg: MessageRecipient) => {
        return await msg.message;
      });
  }

  getRecipientGroup(id: string): Promise<UserGroup> {
    return this.findOne(id)
      .then(async (msg: MessageRecipient) => {
        return await msg.recipientGroup;
      });
  }

  isRead(id: string): Promise<boolean> {
    return this.findOne(id)
      .then((msg: MessageRecipient) => msg.isRead);
  }
}
