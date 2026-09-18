import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.error.js';

export async function helloWorld(
  _req: Request,
  res: Response,
): Promise<Response> {
  let status = 200;

  try {
    return res.status(status).json({
      message: 'Hello World',
    });
} catch {
  status = 500;
  throw new AppError(
    status,
    'Error interno del servidor',
    'INTERNAL_ERROR',
    [],
  );
}
}

export async function rutaNoEncontrada(
  _req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  let status = 404;

  try {
    throw new AppError(
      status,
      'Ruta no encontrada',
      'ROUTE_NOT_FOUND',
      [],
    );
  } catch (error) {
    next(error);
  }
}