import { BaseRouter } from '../utils';
import { UserGroupController } from '../controller';

export class UserGroupRouter extends BaseRouter<UserGroupController> {

  constructor(controller: UserGroupController) {
    super(controller);
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
