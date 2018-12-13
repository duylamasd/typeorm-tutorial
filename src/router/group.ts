import { BaseRouter } from '../utils';
import { GroupController } from '../controller';
import {
  SingletonRouterInstance,
  SingletonClass
} from '../decorator';
import { DecoratorMetadataKeys } from '../constant';

/**
 * Group router
 * @extends BaseRouter<GroupController>
 */
@SingletonClass(DecoratorMetadataKeys.ROUTER_INSTANCE)
export class GroupRouter extends BaseRouter<GroupController> {

  @SingletonRouterInstance(GroupController)
  private static instance: GroupRouter;

  private constructor(controller: GroupController) {
    super(controller);
  }

  protected initRoutes(): void {
    this.router.get('/:idOrName/status', this.controller.isActive);
    this.router.get('/:idOrName/user-groups', this.controller.getUserGroups);

    this.router.put('/:id/activate', this.controller.activate);
    this.router.put('/:id/deactivate', this.controller.deactivate);
  }
}
