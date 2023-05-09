import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { ApiError } from '../exceptions';

export const validateBodyRequestMiddleware = (classToValidate: ClassConstructor<object>) => {
  return ({ body }: Request, res: Response, next: NextFunction): void => {
    const instance = plainToClass(classToValidate, body);

		validate(instance).then((errors) => {
			if (errors.length > 0) {
        const mappedErrors = mapErrors(errors);
				next(ApiError.BadRequest("Validation Error", mappedErrors));
        return;
			}
      next();
		});
  }
}

function mapErrors(errors: ValidationError[]): string[] {
  const mappedErrors: string[] = [];

  errors.map(error => {
    Object.keys(error.constraints).map(key => {
      mappedErrors.push(error.constraints[key]) 
    })
  });
  return mappedErrors;
}
