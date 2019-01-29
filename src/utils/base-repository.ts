import {
  Repository,
  TreeRepository
} from "typeorm";
import { BaseEntity } from "./base-entity";

export namespace BaseRepositories {
  /**
   * Base repository
   * @extends Repository<Entity>
   */
  export abstract class BaseRepository<Entity extends BaseEntity> extends Repository<Entity> {

  }

  /**
   * Base tree repository
   * @extends TreeRepository<Entity>
   */
  export abstract class BaseTreeRepository<Entity extends BaseEntity> extends TreeRepository<Entity> {

  }
}
