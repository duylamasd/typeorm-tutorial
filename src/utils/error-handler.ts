import {
  Request,
  Response,
  NextFunction
} from 'express';

/**
 * The error handler
 * @param {any}           err   The error to be handled.
 * @param {Request}       req   The request payload.
 * @param {Response}      res   The response handler.
 * @param {NextFunction}  next  The next function.
 */
export function ErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode: number = err.code || err.statusCode || 500;
  res.status(statusCode).json({
    message: 'error',
    metadata: err
  });
}
