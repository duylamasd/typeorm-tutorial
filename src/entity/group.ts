import {
  Column,
  Entity,
  Index,
  OneToMany
} from 'typeorm';
import { BaseEntity } from '../utils';
import { UserGroup } from './user-group';

/**
 * Group entity
 * @extends BaseEntity
 */
@Entity()
@Index('I003', ['name'], {
  unique: true
})
export class Group extends BaseEntity {

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false
  })
  name: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: true
  })
  isActive: boolean;

  @OneToMany(type => UserGroup, userGroup => userGroup.group)
  userGroups: Promise<UserGroup[]>;
}
