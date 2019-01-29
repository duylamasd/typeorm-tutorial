import "reflect-metadata";

/**
 * Singleton class decorator.
 * This decorator adds the getInstance static method for getting the value of the instance property.
 * @param {string} metadataKey The metadata key.
 */
export function SingletonClass(metadataKey: string) {
  return function (target: any) {
    // Get the right instance property name of the class from metadata.
    let instancePropertyName = Reflect.getMetadata(metadataKey, target);

    // Create the getInstance method.
    target.getInstance = () => {
      return target[instancePropertyName];
    }

    return target;
  };
}

export * from "./controller";
export * from "./router";
