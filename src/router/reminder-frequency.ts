import { BaseRouter } from '../utils';
import { ReminderFrequencyController } from '../controller';

/**
 * Reminder frequency router
 * @extends BaseRouter<ReminderFrequencyController>
 */
export class ReminderFrequencyRouter extends BaseRouter<ReminderFrequencyController> {

  private static instance: ReminderFrequencyRouter;

  private constructor(controller: ReminderFrequencyController) {
    super(controller);
  }

  public static getInstance(): ReminderFrequencyRouter {
    if (!this.instance) {
      let controller = ReminderFrequencyController.getInstance();
      this.instance = new ReminderFrequencyRouter(controller);
    }

    return this.instance;
  }

  protected initRoutes(): void {
    this.router.get('/find-by-title/:title', this.controller.findByTitle);
    this.router.get('/:id/status', this.controller.isActive);
    this.router.get('/:id/messages', this.controller.getMessages);
  }
}
