import { Request, Response, NextFunction } from "express";

// Catch error method decorator
export const Catch = (): any => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: Request, res: Response, next: NextFunction) {
      try {
        const result = originalMethod.apply(this, [req, res, next]);

        if (result && result instanceof Promise) {
          return result.catch((error: any) => {
            next(error);
          });
        }

        return result;
      } catch (error) {
        next(error)
      }
    };

    return descriptor;
  };
};

// Class decorator
export const ControllerCatch = (): any => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  
    if (descriptor) {
      return _generateDescriptor(descriptor);
    }

    for (const propertyName of Reflect.ownKeys(target.prototype).filter(prop => prop !== 'constructor')) {
      const desc = Object.getOwnPropertyDescriptor(target.prototype, propertyName)!;
      const isMethod = desc.value instanceof Function;

      if (!isMethod) continue;

      Object.defineProperty(target.prototype, propertyName, _generateDescriptor(desc));
    }
  };
};

function _generateDescriptor(
  descriptor: PropertyDescriptor
): PropertyDescriptor {

  const originalMethod = descriptor.value;

  descriptor.value = function (req: Request, res: Response, next: NextFunction) {
    try {
      const result = originalMethod.apply(this, [req, res, next]);

      if (result && result instanceof Promise) {
        return result.catch((error: any) => {
          next(error);
        });
      }

      return result;
    } catch (error) {
      next(error)
    }
  };

  return descriptor;
}