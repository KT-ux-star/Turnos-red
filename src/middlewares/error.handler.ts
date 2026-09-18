import type {
  NextFunction,
  Request,
  Response,
} from 'express';
import { AppError } from '../errors/app.error.js';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  void _next;

  if (error instanceof AppError) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      code: error.code,
      details: error.details,
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    status: 500,
    message: 'Error interno del servidor',
    code: 'INTERNAL_ERROR',
    details: [],
  });
}