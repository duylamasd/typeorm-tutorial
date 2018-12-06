import { EntityRepository } from 'typeorm';
import { BaseRepositories } from '../utils';
import { ReminderFrequency, Message } from '../entity';

/**
 * Reminder frequency repository
 * @extends BaseRepositories.BaseRepository<ReminderFrequency>
 */
@EntityRepository(ReminderFrequency)
export class ReminderFrequencyRepository extends BaseRepositories.BaseRepository<ReminderFrequency> {

  findByTitle(title: string, skip?: number, limit?: number): Promise<ReminderFrequency[]> {
    return this.find({
      where: { title },
      skip: skip,
      take: limit
    });
  }

  isActive(id: string): Promise<boolean> {
    return this.findOne(id)
      .then((rmd: ReminderFrequency) => rmd.isActive);
  }

  getMessages(id: string, skip?: number, limit?: number): Promise<Message[]> {
    return this.createQueryBuilder('rF')
      .relation(Message, 'messages')
      .of(id)
      .select()
      .skip(skip)
      .limit(limit)
      .getMany();
  }
}
