import { Router } from 'express';
import { BaseRouter } from '../utils';
import { UserController } from '../controller';

/**
 * User router
 * @extends BaseRouter<UserController>
 */
export class UserRouter extends BaseRouter<UserController> {

  constructor(controller: UserController) {
    super(controller);
  }
}
