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

    const getter = () => {
      if (!instance) {
        instance = Reflect.construct(target, [repository]);
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
 * Singleton controller class decorator.
 * This decorator adds the getInsatance static method for getting the value of the instance property.
 */
export function SingletonControllerClass() {
  return function (target: any) {
    // Get the right instance property name of the class from metadata.
    let instancePropertyName = Reflect.getMetadata(DecoratorMetadataKeys.CONTROLLER_INSTANCE, target);

    // Create the getInstance method.
    target.getInstance = () => {
      return target[instancePropertyName];
    }
  }
}
