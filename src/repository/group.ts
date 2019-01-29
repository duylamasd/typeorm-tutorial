import {
  EntityRepository,
  UpdateResult,
  DeleteResult,
  getConnection
} from "typeorm";
import { BaseRepositories } from "../utils";
import { Group, UserGroup } from "../entity";

/**
 * Group repository
 * @extends BaseRepositories.BaseRepository<Group>
 */
@EntityRepository(Group)
export class GroupRepository extends BaseRepositories.BaseRepository<Group> {

  findByName(name: string): Promise<Group> {
    return this.findOne({ name });
  }

  activateById(id: string): Promise<UpdateResult> {
    return this.update(id, { isActive: true });
  }

  deactivateById(id: string): Promise<UpdateResult> {
    return this.update(id, { isActive: false });
  }

  activateByName(name: string): Promise<UpdateResult> {
    return this.update({ name }, { isActive: true });
  }

  deactivateByName(name: string): Promise<UpdateResult> {
    return this.update({ name }, { isActive: false });
  }

  deleteByName(name: string): Promise<DeleteResult> {
    return this.delete({ name });
  }

  isActive(idOrName: string): Promise<boolean> {
    return this.createQueryBuilder("group")
      .where("group.id = :id", { id: idOrName })
      .orWhere("group.name = :name", { name: idOrName })
      .getOne()
      .then((group: Group) => group.isActive);
  }

  getUserGroups(idOrName: string, skip?: number, limit?: number): Promise<UserGroup[]> {
    return getConnection()
      .createQueryBuilder(UserGroup, "userGroup")
      .leftJoinAndSelect(Group, "group", "group.id = userGroup.groupId")
      .where("group.id = :id", { id: idOrName })
      .orWhere("group.name = :name", { name: idOrName })
      .skip(skip)
      .take(limit)
      .getMany();
  }
}
