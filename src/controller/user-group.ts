import {
  Request,
  Response,
  NextFunction
} from 'express';
import { ObjectType } from 'typeorm';
import { UserGroupRepository } from '../repository';
import { BaseController } from '../utils';
import { User, Group, MessageRecipient } from '../entity';
import { APIQuery } from '../constant';

/**
 * User group repository
 * @extends BaseController<UserGroupRepository>
 */
export class UserGroupController extends BaseController<UserGroupRepository> {

  constructor(repository: ObjectType<UserGroupController>) {
    super(repository);
  }

  isActive = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    this.repository.isActive(id)
      .then((status: boolean) => {
        res.json({ status });
      }).catch(e => {
        next(e);
      });
  }

  activate = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    this.repository.activateById(id)
      .then(result => {
        res.json(result);
      }).catch(e => {
        next(e);
      });
  }

  deactivate = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    this.repository.deactivateById(id)
      .then(result => {
        res.json(result);
      }).catch(e => {
        next(e);
      });
  }

  findUser = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    this.repository.findUser(id)
      .then((user: User) => {
        res.json(user);
      }).catch(e => {
        next(e);
      });
  }

  findGroup = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    this.repository.findGroup(id)
      .then((group: Group) => {
        res.json(group);
      }).catch(e => {
        next(e);
      });
  }

  getMessageRecipients = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    let skip = req.params[APIQuery.SKIP];
    let limit = req.params[APIQuery.LIMIT];
    this.repository.getMessageRecipients(id, skip, limit)
      .then((msrs: MessageRecipient[]) => {
        res.json(msrs);
      }).catch(e => {
        next(e);
      });
  }
}
