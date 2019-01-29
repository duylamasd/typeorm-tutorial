import {
  Request,
  Response,
  NextFunction
} from "express";
import { ObjectType } from "typeorm";
import { GroupRepository } from "../repository";
import { BaseController } from "../utils";
import { APIQuery, DecoratorMetadataKeys } from "../constant";
import { UserGroup, Group } from "../entity";
import {
  SingletonControllerInstance,
  SingletonClass
} from "../decorator";

/**
 * Group controller
 * @extends BaseController<GroupRepository>
 */
@SingletonClass(DecoratorMetadataKeys.CONTROLLER_INSTANCE)
export class GroupController extends BaseController<GroupRepository> {

  @SingletonControllerInstance(GroupRepository)
  private static instance: GroupController;

  private constructor(repository: ObjectType<GroupRepository>) {
    super(repository);
  }

  isActive = (req: Request, res: Response, next: NextFunction) => {
    let idOrName = req.params["idOrName"];

    this.repository.isActive(idOrName)
      .then((status: boolean) => {
        res.json({ status });
      }).catch(e => {
        next(e);
      });
  }

  getUserGroups = (req: Request, res: Response, next: NextFunction) => {
    let idOrName = req.params["idOrName"];
    let skip = req.query[APIQuery.SKIP];
    let limit = req.query[APIQuery.LIMIT];

    this.repository.getUserGroups(idOrName, skip, limit)
      .then((userGroups: UserGroup[]) => {
        res.json(userGroups);
      }).catch(e => {
        next(e);
      });
  }

  deactivate = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params["id"];

    this.repository.deactivateById(id)
      .then(result => {
        res.json(result);
      }).catch(e => {
        next(e);
      });
  }

  activate = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params["id"];

    this.repository.activateById(id)
      .then(result => {
        res.json(result);
      }).catch(e => {
        next(e);
      });
  }
}
