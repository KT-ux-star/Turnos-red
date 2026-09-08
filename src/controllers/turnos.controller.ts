import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.error.js';
import * as turnosService from '../services/turnos.services.js';
import { TurnoCrudo, Turno } from '../models/turnos.models.js';
export function obtenerTodos(_req: Request, res: Response): void {
  const turnos = turnosService.obtenerTodos();
  res.status(200).json(turnos);
}

export function obtenerPorId(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    next(
      new AppError(400, 'ID inválido', 'VALIDATION_ERROR', [
        {
          field: 'id',
          message: 'El identificador debe ser un número entero positivo',
        },
      ]),
    );
    return;
  }

  const turno = turnosService.obtenerPorId(id);

  if (!turno) {
    next(
      new AppError(404, 'Turno no encontrado', 'RESOURCE_NOT_FOUND', []),
    );
    return;
  }

  res.status(200).json(turno);
}


export function crearTurno(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const turnoCrudo: TurnoCrudo = req.body;
  const turno = turnosService.crearTurno(turnoCrudo);

  if (!turno) {
    next(
      new AppError(
        400,
        'No se pudo crear el turno. Los datos son inválidos',
        'VALIDATION_ERROR',
        [],
      ),
    );
    return;
  }

  res.status(201).json(turno);
}


export function actualizarTurno(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    next(
      new AppError(400, 'ID inválido', 'VALIDATION_ERROR', [
        {
          field: 'id',
          message: 'El identificador debe ser un número entero positivo',
        },
      ]),
    );
    return;
  }

  const turnoExistente = turnosService.obtenerPorId(id);

  if (!turnoExistente) {
    next(
      new AppError(404, 'Turno no encontrado', 'RESOURCE_NOT_FOUND', []),
    );
    return;
  }

  const datosActualizados: Partial<TurnoCrudo> = req.body;
  const turno = turnosService.actualizarTurno(id, datosActualizados);

  if (!turno) {
    next(
      new AppError(
        400,
        'No se pudo actualizar el turno. Los datos son inválidos',
        'VALIDATION_ERROR',
        [],
      ),
    );
    return;
  }

  res.status(200).json(turno);
}

export function eliminarTurno(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    next(
      new AppError(400, 'ID inválido', 'VALIDATION_ERROR', [
        {
          field: 'id',
          message: 'El identificador debe ser un número entero positivo',
        },
      ]),
    );
    return;
  }

  const eliminado = turnosService.eliminarTurno(id);

  if (!eliminado) {
    next(
      new AppError(404, 'Turno no encontrado', 'RESOURCE_NOT_FOUND', []),
    );
    return;
  }

  res.status(204).send();
}