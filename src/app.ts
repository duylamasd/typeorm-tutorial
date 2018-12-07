import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import compression from 'compression';
import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';

import { UserRouter } from './router';
import { ErrorHandler } from './utils';
import { UserController } from './controller';
import { UserRepository } from './repository';

dotenv.config();

createConnection().then(async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(compression());

  let userRouter = new UserRouter(new UserController(UserRepository))
  app.use('/users', userRouter.router);

  app.use(ErrorHandler);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`started at ${process.env.PORT}`);
  });
});

