import { BaseRouter } from '../utils';
import { GroupController } from '../controller';
import { GroupRepository } from '../repository';

/**
 * Group router
 * @extends BaseRouter<GroupController>
 */
export class GroupRouter extends BaseRouter<GroupController> {

  private static instance: GroupRouter;

  private constructor(controller: GroupController) {
    super(controller);
  }

  public static getInstance(): GroupRouter {
    if (!this.instance) {
      let controller = GroupController.getInstance();
      this.instance = new GroupRouter(controller);
    }

    return this.instance;
  }

  protected initRoutes(): void {
    this.router.get('/:idOrName/status', this.controller.isActive);
    this.router.get('/:idOrName/user-groups', this.controller.getUserGroups);

    this.router.put('/:id/activate', this.controller.activate);
    this.router.put('/:id/deactivate', this.controller.deactivate);
  }
}
