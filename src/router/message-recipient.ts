import { BaseRouter } from '../utils';
import { MessageRecipientController } from '../controller';

/**
 * Message recipient controller
 * @extends BaseRouter<MessageRecipientController>
 */
export class MessageRecipientRouter extends BaseRouter<MessageRecipientController> {

  private static instance: MessageRecipientRouter;

  private constructor(controller: MessageRecipientController) {
    super(controller);
  }

  public static getInstance(): MessageRecipientRouter {
    if (!this.instance) {
      let controller = MessageRecipientController.getInstance();
      this.instance = new MessageRecipientRouter(controller);
    }

    return this.instance;
  }

  protected initRoutes(): void {
    this.router.get('/:id/user', this.controller.getUser);
    this.router.get('/:id/message', this.controller.getMessage);
    this.router.get('/:id/recipient-group', this.controller.getRecipientGroup);
    this.router.get('/:id/status', this.controller.isRead);
  }
}
