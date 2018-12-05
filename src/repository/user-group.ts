import { EntityRepository } from 'typeorm';
import { BaseRepositories } from '../utils';
import { UserGroup } from '../entity';

/**
 * User group repository
 * @extends BaseRepositories.BaseRepository<UserGroup>
 */
@EntityRepository(UserGroup)
export class UserGroupRepository extends BaseRepositories.BaseRepository<UserGroup> {

}
