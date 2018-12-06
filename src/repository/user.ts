import { EntityRepository } from 'typeorm';
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
    return this.createQueryBuilder('user')
      .relation(UserGroup, 'userGroups')
      .of(id)
      .select()
      .skip(skip)
      .limit(limit)
      .getMany();
  }

  getMessages(id: string, skip?: number, limit?: number): Promise<Message[]> {
    return this.createQueryBuilder('user')
      .relation(Message, 'messages')
      .of(id)
      .select()
      .skip(skip)
      .limit(limit)
      .getMany();
  }

  getMessageRecipients(id: string, skip?: number, limit?: number): Promise<MessageRecipient[]> {
    return this.createQueryBuilder('user')
      .relation(MessageRecipient, 'messageRecipients')
      .of(id)
      .select()
      .skip(skip)
      .limit(limit)
      .getMany();
  }
}
