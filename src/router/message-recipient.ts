import { BaseRouter } from '../utils';
import { MessageRecipientController } from '../controller';
import {
  SingletonRouterInstance,
  SingletonClass
} from '../decorator';
import { DecoratorMetadataKeys } from '../constant';
import { ValidationChain } from 'express-validator/check';
import { messageRecipientValidator } from '../validator';

/**
 * Message recipient controller
 * @extends BaseRouter<MessageRecipientController>
 */
@SingletonClass(DecoratorMetadataKeys.ROUTER_INSTANCE)
export class MessageRecipientRouter extends BaseRouter<MessageRecipientController> {

  @SingletonRouterInstance(MessageRecipientController, messageRecipientValidator)
  private static instance: MessageRecipientRouter;

  private constructor(controller: MessageRecipientController, validator?: ValidationChain[]) {
    super(controller, validator);
  }

  protected initRoutes(): void {
    this.router.get('/:id/user', this.controller.getUser);
    this.router.get('/:id/message', this.controller.getMessage);
    this.router.get('/:id/recipient-group', this.controller.getRecipientGroup);
    this.router.get('/:id/status', this.controller.isRead);
  }
}
