import { BaseRouter } from '../utils';
import { MessageRecipientController } from '../controller';
import {
  SingletonRouterInstance,
  SingletonRouterClass
} from '../decorator';

/**
 * Message recipient controller
 * @extends BaseRouter<MessageRecipientController>
 */
@SingletonRouterClass()
export class MessageRecipientRouter extends BaseRouter<MessageRecipientController> {

  @SingletonRouterInstance(MessageRecipientController)
  private static instance: MessageRecipientRouter;

  private constructor(controller: MessageRecipientController) {
    super(controller);
  }

  protected initRoutes(): void {
    this.router.get('/:id/user', this.controller.getUser);
    this.router.get('/:id/message', this.controller.getMessage);
    this.router.get('/:id/recipient-group', this.controller.getRecipientGroup);
    this.router.get('/:id/status', this.controller.isRead);
  }
}
