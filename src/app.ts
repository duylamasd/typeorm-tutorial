import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import compression from 'compression';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { ErrorHandler } from './utils';
import {
  UserRouter,
  GroupRouter,
  UserGroupRouter
} from './router';
import {
  UserController,
  GroupController,
  UserGroupController
} from './controller';
import {
  UserRepository,
  GroupRepository,
  UserGroupRepository
} from './repository';

dotenv.config();

createConnection().then(async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(compression());

  let userRouter = new UserRouter(new UserController(UserRepository));
  let groupRouter = new GroupRouter(new GroupController(GroupRepository));
  let userGroupRouter = new UserGroupRouter(new UserGroupController(UserGroupRepository));
  app.use('/users', userRouter.router);
  app.use('/groups', groupRouter.router);
  app.use('/user-groups', userGroupRouter.router);

  app.use(ErrorHandler);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`started at ${process.env.PORT}`);
  });
});

