import {
  Request,
  Response,
  NextFunction
} from 'express';
import { validationResult } from 'express-validator/check';
import HttpStatus from 'http-status-codes';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      statusCode: HttpStatus.BAD_REQUEST,
      errors: errors.array()
    });
  }

  return next();
}

export * from './group';
export * from './message-recipient';
export * from './message';
export * from './reminder-frequency';
export * from './user-group';
export * from './user';
