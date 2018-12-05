import { EntityRepository } from 'typeorm';
import { BaseRepositories } from '../utils';
import { Message } from '../entity';

/**
 * Message repository
 * @extends BaseRepositories.BaseTreeRepository<Message>
 */
@EntityRepository(Message)
export class MessageRepository extends BaseRepositories.BaseTreeRepository<Message> {

}
