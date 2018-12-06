import {
  EntityRepository,
  UpdateResult,
  DeleteResult
} from 'typeorm';
import { BaseRepositories } from '../utils';
import { Group, UserGroup } from '../entity';

/**
 * Group repository
 * @extends BaseRepositories.BaseRepository<Group>
 */
@EntityRepository(Group)
export class GroupRepository extends BaseRepositories.BaseRepository<Group> {

  findByName(name: string): Promise<Group> {
    return this.findOne({ name });
  }

  activeById(id: string): Promise<UpdateResult> {
    return this.update(id, { isActive: true });
  }

  deactiveById(id: string): Promise<UpdateResult> {
    return this.update(id, { isActive: false });
  }

  activeByName(name: string): Promise<UpdateResult> {
    return this.update({ name }, { isActive: true });
  }

  deactiveByName(name: string): Promise<UpdateResult> {
    return this.update({ name }, { isActive: false });
  }

  deleteByName(name: string): Promise<DeleteResult> {
    return this.delete({ name });
  }

  isActive(idOrName: string): Promise<boolean> {
    return this.createQueryBuilder('group')
      .where('group.id = :id', { id: idOrName })
      .orWhere('group.name = :name', { name: idOrName })
      .getOne()
      .then((group: Group) => group.isActive);
  }

  getUserGroups(idOrName: string, skip?: number, limit?: number): Promise<UserGroup[]> {
    return this.createQueryBuilder('group')
      .where('group.id = :id', { id: idOrName })
      .orWhere('group.name = :name', { name: idOrName })
      .relation(UserGroup, 'userGroups')
      .select()
      .skip(skip)
      .limit(limit)
      .getMany();
  }
}
