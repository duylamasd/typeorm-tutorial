import { Express } from 'express';
import { GroupRouter } from './group';
import { UserRouter } from './user';
import { UserGroupRouter } from './user-group';
import {
  UserController,
  GroupController,
  UserGroupController
} from '../controller';
import {
  UserRepository,
  GroupRepository,
  UserGroupRepository
} from '../repository';

/**
 * Initiate application routers.
 * @param {Express} app The application.
 */
const initRoutes = async (app: Express) => {
  let userRouter = new UserRouter(new UserController(UserRepository));
  let groupRouter = new GroupRouter(new GroupController(GroupRepository));
  let userGroupRouter = new UserGroupRouter(new UserGroupController(UserGroupRepository));

  app.use('/users', userRouter.router);
  app.use('/groups', groupRouter.router);
  app.use('/user-groups', userGroupRouter.router);
}

export default initRoutes;
