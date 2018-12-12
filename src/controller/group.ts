import {
  Request,
  Response,
  NextFunction
} from 'express';
import { ObjectType } from 'typeorm';
import { GroupRepository } from '../repository';
import { BaseController } from '../utils';
import { APIQuery } from '../constant';
import { UserGroup } from '../entity';

/**
 * Group controller
 * @extends BaseController<GroupRepository>
 */
export class GroupController extends BaseController<GroupRepository> {

  private static instance: GroupController;

  private constructor(repository: ObjectType<GroupRepository>) {
    super(repository);
  }

  public static getInstance(): GroupController {
    if (!this.instance) {
      this.instance = new GroupController(GroupRepository);
    }

    return this.instance;
  }

  isActive = (req: Request, res: Response, next: NextFunction) => {
    let idOrName = req.params['idOrName'];
    this.repository.isActive(idOrName)
      .then((status: boolean) => {
        res.json({ status });
      }).catch(e => {
        next(e);
      });
  }

  getUserGroups = (req: Request, res: Response, next: NextFunction) => {
    let idOrName = req.params['idOrName'];
    let skip = req.params[APIQuery.SKIP];
    let limit = req.params[APIQuery.LIMIT];
    this.repository.getUserGroups(idOrName, skip, limit)
      .then((userGroups: UserGroup[]) => {
        res.json(userGroups);
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

  activate = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    this.repository.activateById(id)
      .then(result => {
        res.json(result);
      }).catch(e => {
        next(e);
      });
  }
}
