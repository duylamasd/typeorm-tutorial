import {
  BaseEntity as Base,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

/**
 * Base entity, contains id and timestamps columns.
 * @extends   Base
 * @property  {string}  id
 * @property  {Date}    createdAt
 * @property  {Date}    updatedAt
 */
export abstract class BaseEntity extends Base {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'datetime'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime'
  })
  updatedAt: Date;
}
