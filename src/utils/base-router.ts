import { Router } from "express";
import { BaseController } from "./base-controller";
import { validateRequest } from "../validator";
import { ValidationChain } from "express-validator/check";

/**
 * Base router
 */
export abstract class BaseRouter<T extends BaseController<any>> {
  /**
   * Controller
   */
  protected controller: T;

  /**
   * Validator
   */
  protected validator: ValidationChain[];

  /**
   * Router
   */
  public router: Router;

  constructor(controller: T, validator: ValidationChain[]) {
    this.controller = controller;
    this.validator = validator;
    this.router = Router();
    this.initBasicRoute();
    this.initRoutes();
  }

  protected initBasicRoute(): void {
    this.router.get("/", this.controller.find);
    this.router.get("/:id", this.controller.findById);

    this.router.post("/", this.validator, validateRequest, this.controller.create);
  }

  protected abstract initRoutes(): void;
}
