import { BaseRouter } from '../utils';
import { GroupController } from '../controller';

/**
 * Group router
 * @extends BaseRouter<GroupController>
 */
export class GroupRouter extends BaseRouter<GroupController> {

  constructor(controller: GroupController) {
    super(controller);
  }

  protected initRoutes(): void {
    this.router.get('/:idOrName/status', this.controller.isActive);
    this.router.get('/:idOrName/user-groups', this.controller.getUserGroups);

    this.router.put('/:id/activate', this.controller.activate);
    this.router.put('/:id/deactivate', this.controller.deactivate);
  }
}
