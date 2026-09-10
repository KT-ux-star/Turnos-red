import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.error.js';
import * as turnosService from '../services/turnos.services.js';
import { TurnoCrudo, Turno } from '../models/turnos.models.js';
import * as medicosService from '../services/medicos.service.js';

export function obtenerTodos(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { especialidad, fecha, medicoId } = req.query;

  let medicoIdNumero: number | undefined;

  if (medicoId !== undefined) {
    medicoIdNumero = Number(medicoId);

    if (!Number.isInteger(medicoIdNumero) || medicoIdNumero <= 0) {
      next(
        new AppError(400, 'medicoId inválido', 'VALIDATION_ERROR', [
          {
            field: 'medicoId',
            message: 'Debe ser un número entero positivo',
          },
        ]),
      );
      return;
    }
  }

  const turnos = turnosService.obtenerTodos({
    especialidad:
      typeof especialidad === 'string' ? especialidad : undefined,
    fecha: typeof fecha === 'string' ? fecha : undefined,
    medicoId: medicoIdNumero,
  });

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
  if (turnoCrudo.medicoId === undefined) {
  next(
    new AppError(400, 'medicoId es obligatorio', 'VALIDATION_ERROR', [
      {
        field: 'medicoId',
        message: 'Debe indicar un médico para el turno',
      },
    ]),
  );
  return;
}

const medico = medicosService.obtenerPorId(turnoCrudo.medicoId);

if (!medico) {
  next(
    new AppError(404, 'Médico no encontrado', 'RESOURCE_NOT_FOUND', [
      {
        field: 'medicoId',
        message: 'No existe un médico con el ID indicado',
      },
    ]),
  );
  return;
}
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
  if (datosActualizados.medicoId !== undefined) {
  const medico = medicosService.obtenerPorId(datosActualizados.medicoId);

  if (!medico) {
    next(
      new AppError(404, 'Médico no encontrado', 'RESOURCE_NOT_FOUND', [
        {
          field: 'medicoId',
          message: 'No existe un médico con el ID indicado',
        },
      ]),
    );
    return;
  }
}
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