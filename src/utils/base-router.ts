import { Router } from 'express';
import { BaseController } from './base-controller';

/**
 * Base router
 */
export abstract class BaseRouter<T extends BaseController<any>> {
  /**
   * Controller
   */
  protected controller: T;

  /**
   * Router
   */
  public router: Router;

  constructor(controller: T) {
    this.controller = controller;
    this.router = Router();
    this.initBasicRoute();
    this.initRoutes();
  }

  protected initBasicRoute(): void {
    this.router.get('/', this.controller.find);
    this.router.get('/:id', this.controller.findById);
    this.router.post('/', this.controller.create);
  }

  protected abstract initRoutes(): void;
}
