import { BaseRouter } from '../utils';
import { MessageController } from '../controller';
import {
  SingletonRouterInstance,
  SingletonClass
} from '../decorator';
import { DecoratorMetadataKeys } from '../constant';
import { ValidationChain } from 'express-validator/check';
import { messageValidator } from '../validator';

/**
 * Message router
 * @extends BaseRouter<MessageController>
 */
@SingletonClass(DecoratorMetadataKeys.ROUTER_INSTANCE)
export class MessageRouter extends BaseRouter<MessageController> {

  @SingletonRouterInstance(MessageController, messageValidator)
  private static instance: MessageRouter;

  private constructor(controller: MessageController, validator?: ValidationChain[]) {
    super(controller, validator);
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
