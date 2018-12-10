import { EntityRepository, getConnection, UpdateResult } from 'typeorm';
import { BaseRepositories } from '../utils';
import {
  User,
  UserGroup,
  Message,
  MessageRecipient
} from '../entity';

/**
 * User repository
 * @extends BaseRepositories.BaseRepository<User>
 */
@EntityRepository(User)
export class UserRepository extends BaseRepositories.BaseRepository<User> {

  findByName(firstName: string, middleName: string, lastName: string): Promise<User> {
    return this.findOne({ firstName, middleName, lastName });
  }

  activate(id: string): Promise<UpdateResult> {
    return this.update(id, { isActive: true });
  }

  deactivate(id: string): Promise<UpdateResult> {
    return this.update(id, { isActive: false });
  }

  isActive(id: string): Promise<boolean>;
  isActive(firstName: string, middleName: string, lastName: string): Promise<boolean>;
  isActive(idOrFirstName: string, middleName?: string, lastName?: string): Promise<boolean> {
    if (!middleName) {
      return this.findOne(idOrFirstName)
        .then((user: User) => user.isActive);
    }

    return this.findOne({
      firstName: idOrFirstName,
      middleName: middleName,
      lastName: lastName
    }).then((user: User) => user.isActive);
  }

  getUserGroups(id: string, skip?: number, limit?: number): Promise<UserGroup[]> {
    return getConnection()
      .createQueryBuilder(UserGroup, 'userGroup')
      .where('userGroup.userId = :userId', { userId: id })
      .skip(skip)
      .take(limit)
      .getMany();
  }

  getMessages(id: string, skip?: number, limit?: number): Promise<Message[]> {
    return getConnection()
      .createQueryBuilder(Message, 'message')
      .where('message.creatorId = :creatorId', { creatorId: id })
      .offset(skip)
      .limit(limit)
      .getMany();
  }

  getMessageRecipients(id: string, skip?: number, limit?: number): Promise<MessageRecipient[]> {
    return getConnection()
      .createQueryBuilder(MessageRecipient, 'mr')
      .where('mr.recipientId = :recipientId', { recipientId: id })
      .offset(skip)
      .limit(limit)
      .getMany();
  }
}
