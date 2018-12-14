import { BaseRouter } from '../utils';
import { UserGroupController } from '../controller';
import {
  SingletonRouterInstance,
  SingletonClass
} from '../decorator';
import { DecoratorMetadataKeys } from '../constant';
import { ValidationChain } from 'express-validator/check';
import { userGroupValidator } from '../validator';

/**
 * User-group router
 * @extends BaseRouter<UserGroupController>
 */
@SingletonClass(DecoratorMetadataKeys.ROUTER_INSTANCE)
export class UserGroupRouter extends BaseRouter<UserGroupController> {

  @SingletonRouterInstance(UserGroupController, userGroupValidator)
  private static instance: UserGroupRouter;

  private constructor(controller: UserGroupController, validator?: ValidationChain[]) {
    super(controller, validator);
  }

  protected initRoutes(): void {
    this.router.get('/:id/user', this.controller.findUser);
    this.router.get('/:id/group', this.controller.findGroup);
    this.router.get('/:id/status', this.controller.isActive);
    this.router.get('/:id/message-recipients', this.controller.getMessageRecipients);

    this.router.put('/:id/activate', this.controller.activate);
    this.router.put('/:id/deactivate', this.controller.deactivate);
  }
}
