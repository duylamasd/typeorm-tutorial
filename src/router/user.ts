import { BaseRouter } from '../utils';
import { UserController } from '../controller';

/**
 * User router
 * @extends BaseRouter<UserController>
 */
export class UserRouter extends BaseRouter<UserController> {

  constructor(controller: UserController) {
    super(controller);
  }

  protected initRoutes(): void {
    this.router.get('/:id/status', this.controller.isActive);
    this.router.get('/:id/messages', this.controller.getMessages);
    this.router.get('/:id/message-recipients', this.controller.getMessageRecipients);
    this.router.get('/:id/user-groups', this.controller.getUserGroups);

    this.router.put('/:id/activate', this.controller.activate);
    this.router.put('/:id/deactivate', this.controller.deactivate);
  }
}
