import 'reflect-metadata';
import { DecoratorMetadataKeys } from '../constant';

/**
 * Singleton instance property of the router.
 * This decorator save the property name as class's metadata.
 * @param controller The controller
 */
export function SingletonRouterInstance<T>(controllerType?: T) {
  return function (target: any, property: string | symbol) {
    // Define metadata for validation
    Reflect.defineMetadata(DecoratorMetadataKeys.ROUTER_INSTANCE, property, target);

    // #region Create getter and setter for the targeted property
    let instance = target[property];

    // Create new one if instance doesn't exist. Return the instance.
    const getter = () => {
      if (!instance) {
        let controller = controllerType['getInstance']();
        instance = Reflect.construct(target, [controller]);
      }

      return instance;
    }

    const setter = (value) => {
      instance = value;
    }

    Reflect.deleteProperty[property];
    Reflect.defineProperty(target, property, {
      get: getter,
      set: setter
    });
    // #endregion
  }
}

/**
 * Singleton router class decorator.
 * This decorator adds the getInsatance static method for getting the value of the instance property.
 */
export function SingletonRouterClass() {
  return function (target: any) {
    // Get the instance property name of the class from metadata.
    let instancePropertyName = Reflect.getMetadata(DecoratorMetadataKeys.ROUTER_INSTANCE, target);

    // Create the getInstance method
    target.getInstance = () => {
      return target[instancePropertyName];
    }
  }
}
