import { BaseRouter } from "../utils";
import { GroupController } from "../controller";
import {
  SingletonRouterInstance,
  SingletonClass
} from "../decorator";
import { DecoratorMetadataKeys } from "../constant";
import { groupValidator } from "../validator";
import { ValidationChain } from "express-validator/check";

/**
 * Group router
 * @extends BaseRouter<GroupController>
 */
@SingletonClass(DecoratorMetadataKeys.ROUTER_INSTANCE)
export class GroupRouter extends BaseRouter<GroupController> {

  @SingletonRouterInstance(GroupController, groupValidator)
  private static instance: GroupRouter;

  private constructor(controller: GroupController, validator?: ValidationChain[]) {
    super(controller, validator);
  }

  protected initRoutes(): void {
    this.router.get("/:idOrName/status", this.controller.isActive);
    this.router.get("/:idOrName/user-groups", this.controller.getUserGroups);

    this.router.put("/:id/activate", this.controller.activate);
    this.router.put("/:id/deactivate", this.controller.deactivate);
  }
}
