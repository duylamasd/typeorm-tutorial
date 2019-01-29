import { BaseRouter } from "../utils";
import { ReminderFrequencyController } from "../controller";
import {
  SingletonRouterInstance,
  SingletonClass
} from "../decorator";
import { DecoratorMetadataKeys } from "../constant";
import { ValidationChain } from "express-validator/check";
import { reminderFrequencyValidator } from "../validator";

/**
 * Reminder frequency router
 * @extends BaseRouter<ReminderFrequencyController>
 */
@SingletonClass(DecoratorMetadataKeys.ROUTER_INSTANCE)
export class ReminderFrequencyRouter extends BaseRouter<ReminderFrequencyController> {

  @SingletonRouterInstance(ReminderFrequencyController, reminderFrequencyValidator)
  private static instance: ReminderFrequencyRouter;

  private constructor(controller: ReminderFrequencyController, validator?: ValidationChain[]) {
    super(controller, validator);
  }

  protected initRoutes(): void {
    this.router.get("/find-by-title/:title", this.controller.findByTitle);
    this.router.get("/:id/status", this.controller.isActive);
    this.router.get("/:id/messages", this.controller.getMessages);
  }
}
