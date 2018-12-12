import { BaseRouter } from '../utils';
import { MessageController } from '../controller';

/**
 * Message router
 * @extends BaseRouter<MessageController>
 */
export class MessageRouter extends BaseRouter<MessageController> {

  private static instance: MessageRouter;

  private constructor(controller: MessageController) {
    super(controller);
  }

  public static getInstance(): MessageRouter {
    if (!this.instance) {
      let controller = MessageController.getInstance();
      this.instance = new MessageRouter(controller);
    }

    return this.instance;
  }

  protected initRoutes(): void {
    this.router.get('/:id/status', this.controller.isReminder);
    this.router.get('/:id/next-remind-date', this.controller.getNextRemindDate);
    this.router.get('/:id/expiry-date', this.controller.getExpiryDate);
    this.router.get('/:id/creator', this.controller.getCreator);
    this.router.get('/:id/reminder-frequency', this.controller.getReminderFrequency);
    this.router.get('/:id/message-recipient', this.controller.getMessageRecipients);
    this.router.get('/:id/parent', this.controller.getParentMessage);
    this.router.get('/:id/children', this.controller.getChildMessages);
  }
}
