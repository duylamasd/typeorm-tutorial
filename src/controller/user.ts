import {
  Request,
  Response,
  NextFunction
} from 'express';
import { ObjectType } from 'typeorm';
import { UserRepository } from '../repository';
import { BaseController } from '../utils';

export class UserController extends BaseController<UserRepository> {

  constructor(repository: ObjectType<UserRepository>) {
    super(repository);
  }
}
