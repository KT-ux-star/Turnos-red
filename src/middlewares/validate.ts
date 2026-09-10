import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
import { AppError } from '../errors/app.error.js';

export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      const details = resultado.error.issues.map((issue) => ({
        field: issue.path.join('.') || 'body',
        message: issue.message,
      }));

      next(
        new AppError(
          400,
          'Error de validación en los datos ingresados',
          'VALIDATION_ERROR',
          details,
        ),
      );
      return;
    }

    req.body = resultado.data;
    next();
  };
}