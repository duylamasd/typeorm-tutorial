import { EntityRepository, getConnection, UpdateResult } from "typeorm";
import { BaseRepositories } from "../utils";
import { UserGroup, User, Group, MessageRecipient } from "../entity";

/**
 * User group repository
 * @extends BaseRepositories.BaseRepository<UserGroup>
 */
@EntityRepository(UserGroup)
export class UserGroupRepository extends BaseRepositories.BaseRepository<UserGroup> {

  findByUserAndGroup(userId: string, groupId: string): Promise<UserGroup> {
    return this.findOne({ userId, groupId });
  }

  isActive(id: string): Promise<boolean>;
  isActive(userId: string, groupId: string): Promise<boolean>;
  isActive(idOrUserId: string, groupId?: string): Promise<boolean> {
    if (!groupId) {
      return this.findOne(idOrUserId)
        .then((userGroup: UserGroup) => userGroup.isActive);
    }

    return this.findOne({
      userId: idOrUserId,
      groupId: groupId
    }).then((userGroup: UserGroup) => userGroup.isActive);
  }

  activateById(id: string): Promise<UpdateResult> {
    return this.update(id, { isActive: true });
  }

  deactivateById(id: string): Promise<UpdateResult> {
    return this.update(id, { isActive: false });
  }

  findUser(id: string): Promise<User> {
    return this.findOne(id)
      .then(async (userGroup: UserGroup) => {
        return await userGroup.user;
      });
  }

  findGroup(id: string): Promise<Group> {
    return this.findOne(id)
      .then(async (userGroup: UserGroup) => {
        return await userGroup.group;
      });
  }

  getMessageRecipients(id: string, skip?: number, limit?: number): Promise<MessageRecipient[]> {
    return getConnection()
      .createQueryBuilder(MessageRecipient, "mr")
      .where("mr.recipientGroupId = :rgId", { rgId: id })
      .offset(skip)
      .limit(limit)
      .getMany();
  }
}
