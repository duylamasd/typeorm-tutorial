import { BaseRouter } from '../utils';
import { ReminderFrequencyController } from '../controller';
import {
  SingletonRouterInstance,
  SingletonRouterClass
} from '../decorator';

/**
 * Reminder frequency router
 * @extends BaseRouter<ReminderFrequencyController>
 */
@SingletonRouterClass()
export class ReminderFrequencyRouter extends BaseRouter<ReminderFrequencyController> {

  @SingletonRouterInstance(ReminderFrequencyController)
  private static instance: ReminderFrequencyRouter;

  private constructor(controller: ReminderFrequencyController) {
    super(controller);
  }

  protected initRoutes(): void {
    this.router.get('/find-by-title/:title', this.controller.findByTitle);
    this.router.get('/:id/status', this.controller.isActive);
    this.router.get('/:id/messages', this.controller.getMessages);
  }
}
