import { ClassConstructor, ClassTransformOptions, plainToInstance } from "class-transformer";

// Serialize returned data by dto instance
export const Serialize = <T>(dto: ClassConstructor<T>) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any) {
      const result = originalMethod.apply(this, args);
      const options: ClassTransformOptions = { excludeExtraneousValues: true };
      const transformedResult = plainToInstance(dto, result, options)

      return transformedResult;
    };

    return descriptor;
  };
};
