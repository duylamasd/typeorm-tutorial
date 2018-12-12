import {
  Request,
  Response,
  NextFunction
} from 'express';
import { User, Message, UserGroup } from '../entity';
import { ObjectType } from 'typeorm';
import { BaseController } from '../utils';
import { MessageRecipientRepository } from '../repository';
import { APIQuery } from '../constant';

/**
 * Message recipient controller
 * @extends BaseController<MessageRecipientRepository>
 */
export class MessageRecipientController extends BaseController<MessageRecipientRepository> {

  private static instance: MessageRecipientController;

  private constructor(repository: ObjectType<MessageRecipientRepository>) {
    super(repository);
  }

  public static getInstance(): MessageRecipientController {
    if (!this.instance) {
      this.instance = new MessageRecipientController(MessageRecipientRepository);
    }

    return this.instance;
  }

  getUser = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];

    this.repository.getUser(id)
      .then((user: User) => {
        res.json(user);
      }).catch(e => {
        next(e);
      });
  }

  getMessage = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];

    this.repository.getMessage(id)
      .then((message: Message) => {
        res.json(message);
      }).catch(e => {
        next(e);
      });
  }

  getRecipientGroup = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];

    this.repository.getRecipientGroup(id)
      .then((group: UserGroup) => {
        res.json(group);
      }).catch(e => {
        next(e);
      });
  }

  isRead = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];

    this.repository.isRead(id)
      .then((status: boolean) => {
        res.json({ status });
      }).catch(e => {
        next(e);
      });
  }
}
