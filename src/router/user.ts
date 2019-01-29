import { BaseRouter } from "../utils";
import { UserController } from "../controller";
import {
  SingletonRouterInstance,
  SingletonClass
} from "../decorator";
import { DecoratorMetadataKeys } from "../constant";
import { ValidationChain } from "express-validator/check";
import { userValidator } from "../validator";

/**
 * User router
 * @extends BaseRouter<UserController>
 */
@SingletonClass(DecoratorMetadataKeys.ROUTER_INSTANCE)
export class UserRouter extends BaseRouter<UserController> {

  @SingletonRouterInstance(UserController, userValidator)
  private static instance: UserRouter;

  private constructor(controller: UserController, validator?: ValidationChain[]) {
    super(controller, validator);
  }

  protected initRoutes(): void {
    this.router.get("/:id/status", this.controller.isActive);
    this.router.get("/:id/messages", this.controller.getMessages);
    this.router.get("/:id/message-recipients", this.controller.getMessageRecipients);
    this.router.get("/:id/user-groups", this.controller.getUserGroups);

    this.router.put("/:id/activate", this.controller.activate);
    this.router.put("/:id/deactivate", this.controller.deactivate);
  }
}
