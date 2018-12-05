import { EntityRepository } from 'typeorm';
import { BaseRepositories } from '../utils';
import { User } from '../entity';

/**
 * User repository
 * @extends BaseRepositories.BaseRepository<User>
 */
export class UserRepository extends BaseRepositories.BaseRepository<User> {

}
