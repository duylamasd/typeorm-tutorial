import {
  Repository,
  TreeRepository
} from 'typeorm';

export namespace BaseRepositories {
  /**
 * Base repository
 * @extends Repository<Entity>
 */
  export abstract class BaseRepository<Entity> extends Repository<Entity> {

  }

  /**
   * Base tree repository
   * @extends TreeRepository<Entity>
   */
  export abstract class BaseTreeRepository<Entity> extends TreeRepository<Entity> {

  }
}
