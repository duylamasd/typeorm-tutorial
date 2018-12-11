import 'reflect-metadata';

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import compression from 'compression';
import { createConnection } from 'typeorm';

import { ErrorHandler } from './utils';
import initRoutes from './router';

dotenv.config();

createConnection().then(async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(compression());

  await initRoutes(app);

  app.use(ErrorHandler);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`started at ${process.env.PORT}`);
  });
});

