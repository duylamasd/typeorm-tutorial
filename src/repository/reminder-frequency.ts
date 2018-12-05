import { EntityRepository } from 'typeorm';
import { BaseRepositories } from '../utils';
import { ReminderFrequency } from '../entity';

/**
 * Reminder frequency repository
 * @extends BaseRepositories.BaseRepository<ReminderFrequency>
 */
@EntityRepository(ReminderFrequency)
export class ReminderFrequencyRepository extends BaseRepositories.BaseRepository<ReminderFrequency> {

}
