import {
  Request,
  Response,
  NextFunction
} from 'express';
import { ObjectType } from 'typeorm';
import { UserRepository } from '../repository';
import { BaseController } from '../utils';
import { APIQuery } from '../constant';
import { UserGroup, Message, MessageRecipient } from '../entity';
import {
  SingletonControllerInstance,
  SingletonControllerClass
} from '../decorator';

/**
 * User controller
 * @extends BaseController<UserRepository>
 */
@SingletonControllerClass()
export class UserController extends BaseController<UserRepository> {

  @SingletonControllerInstance(UserRepository)
  private static instance: UserController;

  private constructor(repository: ObjectType<UserRepository>) {
    super(repository);
  }

  isActive = (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params['id'];

    this.repository.isActive(userId)
      .then((status: boolean) => {
        res.json({ status });
      }).catch(e => {
        next(e);
      });
  }

  activate = (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params['id'];

    this.repository.activate(userId)
      .then(result => {
        res.json(result);
      }).catch(e => {
        next(e);
      });
  }

  deactivate = (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params['id'];

    this.repository.deactivate(userId)
      .then(result => {
        res.json(result);
      }).catch(e => {
        next(e);
      });
  }

  getUserGroups = (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params['id'];
    let skip = req.query[APIQuery.SKIP];
    let limit = req.query[APIQuery.LIMIT];

    this.repository.getUserGroups(userId, skip, limit)
      .then((groups: UserGroup[]) => {
        res.json(groups);
      }).catch(e => {
        next(e);
      });
  }

  getMessages = (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params['id'];
    let skip = req.query[APIQuery.SKIP];
    let limit = req.query[APIQuery.LIMIT];

    this.repository.getMessages(userId, skip, limit)
      .then((messages: Message[]) => {
        res.json(messages);
      }).catch(e => {
        next(e);
      });
  }

  getMessageRecipients = (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params['id'];
    let skip = req.query[APIQuery.SKIP];
    let limit = req.query[APIQuery.LIMIT];

    this.repository.getMessageRecipients(userId, skip, limit)
      .then((msr: MessageRecipient[]) => {
        res.json(msr);
      }).catch(e => {
        next(e);
      });
  }
}
