import {
  Request,
  Response,
  NextFunction
} from 'express';
import { ObjectType } from 'typeorm';
import { UserRepository } from '../repository';
import { BaseController } from '../utils';

/**
 * User controller
 * @extends BaseController<UserRepository>
 */
export class UserController extends BaseController<UserRepository> {

  constructor(repository: ObjectType<UserRepository>) {
    super(repository);
  }
}
