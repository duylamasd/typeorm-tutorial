import { EntityRepository } from 'typeorm';
import { BaseRepositories } from '../utils';
import { MessageRecipient } from '../entity';

/**
 * Message recipient repository
 * @extends BaseRepositories.BaseRepository<MessageRecipient>
 */
@EntityRepository(MessageRecipient)
export class MessageRecipientRepository extends BaseRepositories.BaseRepository<MessageRecipient> {

}
