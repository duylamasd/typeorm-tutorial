import 'reflect-metadata';
import { DecoratorMetadataKeys } from '../constant';

/**
 * Singleton instance property of the controller
 * This decorator save the property name as class's metadata for validating.
 * @param repository The repository
 */
export function SingletonControllerInstance<T>(repository?: T) {
  return function (target: any, property: string | symbol) {
    // Define metadata for validation
    Reflect.defineMetadata(DecoratorMetadataKeys.CONTROLLER_INSTANCE, property, target);

    // #region Create getter and setter for the targeted property
    let instance = target[property];

    // Create new one if instance doesn't exist. Return the instance.
    const getter = () => {
      if (!instance) {
        instance = Reflect.construct(target, [repository]);
      }

      return instance;
    }

    const setter = (value) => {
      instance = value;
    }

    Reflect.defineProperty(target, property, {
      get: getter,
      set: setter
    });
    // #endregion
  };
}
