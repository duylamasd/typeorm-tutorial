import { Express } from 'express';
import { GroupRouter } from './group';
import { UserRouter } from './user';
import { UserGroupRouter } from './user-group';

/**
 * Initiate application routers.
 * @param {Express} app The application.
 */
const initRoutes = async (app: Express) => {
  let userRouter = UserRouter.getInstance();
  let groupRouter = GroupRouter.getInstance();
  let userGroupRouter = UserGroupRouter.getInstance();

  app.use('/users', userRouter.router);
  app.use('/groups', groupRouter.router);
  app.use('/user-groups', userGroupRouter.router);
}

export default initRoutes;
