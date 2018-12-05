import { EntityRepository } from 'typeorm';
import { BaseRepositories } from '../utils';
import { Group } from '../entity';

/**
 * Group repository
 * @extends BaseRepositories.BaseRepository<Group>
 */
@EntityRepository(Group)
export class GroupRepository extends BaseRepositories.BaseRepository<Group> {

}
