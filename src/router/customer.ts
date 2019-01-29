import { BaseRouter } from "../utils";
import { CustomerController } from "../controller";
import { SingletonClass, SingletonRouterInstance } from "../decorator";
import { DecoratorMetadataKeys } from "../constant";
import { customerValidator } from "../validator";
import { ValidationChain } from "express-validator/check";

@SingletonClass(DecoratorMetadataKeys.ROUTER_INSTANCE)
export class CustomerRouter extends BaseRouter<CustomerController> {

  @SingletonRouterInstance(CustomerController, customerValidator)
  private static instance: CustomerRouter;

  private constructor(controller: CustomerController, validator?: ValidationChain[]) {
    super(controller, validator);
  }

  protected initRoutes(): void {
    this.router.post("/orders", this.controller.createWithOrders);
  }
}
