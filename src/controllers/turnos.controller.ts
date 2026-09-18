import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.error.js';
import * as turnosService from '../services/turnos.services.js';

export async function obtenerTodos(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  let status = 200;

  try {
    const { especialidad, fecha, medicoId } = req.query;

    let medicoIdNumero: number | undefined;

    if (medicoId !== undefined) {
      medicoIdNumero = Number(medicoId);

      if (!Number.isInteger(medicoIdNumero) || medicoIdNumero <= 0) {
        status = 400;

        throw new AppError(
          status,
          'medicoId inválido',
          'VALIDATION_ERROR',
          [
            {
              field: 'medicoId',
              message: 'Debe ser un número entero positivo',
            },
          ],
        );
      }
    }

    const turnos = turnosService.obtenerTodos({
      especialidad:
        typeof especialidad === 'string' ? especialidad : undefined,
      fecha: typeof fecha === 'string' ? fecha : undefined,
      medicoId: medicoIdNumero,
    });

    return void res.status(status).json(turnos);
  } catch (error) {
    next(error);
  }
}

export async function obtenerPorId(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  let status = 200;

  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      status = 400;

      throw new AppError(
        status,
        'ID inválido',
        'VALIDATION_ERROR',
        [
          {
            field: 'id',
            message: 'El identificador debe ser un número entero positivo',
          },
        ],
      );
    }

    const turno = turnosService.obtenerPorId(id);

    if (!turno) {
      status = 404;

      throw new AppError(
        status,
        'Turno no encontrado',
        'RESOURCE_NOT_FOUND',
        [],
      );
    }

    return void res.status(status).json(turno);
  } catch (error) {
    next(error);
  }
}

export async function crearTurno(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  let status = 201;

  try {
    const datos = req.body;

    const turno = turnosService.crearTurno(datos);

    if (!turno) {
      status = 400;

      throw new AppError(
        status,
        'No se pudo crear el turno. Los datos son inválidos',
        'VALIDATION_ERROR',
        [],
      );
    }

    return void res.status(status).json(turno);
  } catch (error) {
    next(error);
  }
}


export async function actualizarTurno(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  let status = 200;

  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      status = 400;

      throw new AppError(
        status,
        'ID inválido',
        'VALIDATION_ERROR',
        [
          {
            field: 'id',
            message: 'El identificador debe ser un número entero positivo',
          },
        ],
      );
    }

    const turnoExistente = turnosService.obtenerPorId(id);

    if (!turnoExistente) {
      status = 404;

      throw new AppError(
        status,
        'Turno no encontrado',
        'RESOURCE_NOT_FOUND',
        [],
      );
    }

    const datos = req.body;

    const turno = turnosService.actualizarTurno(id, datos);

    if (!turno) {
      status = 400;

      throw new AppError(
        status,
        'No se pudo actualizar el turno. Los datos son inválidos',
        'VALIDATION_ERROR',
        [],
      );
    }

    return void res.status(status).json(turno);
  } catch (error) {
    next(error);
  }
}

export async function eliminarTurno(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  let status = 204;

  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      status = 400;

      throw new AppError(
        status,
        'ID inválido',
        'VALIDATION_ERROR',
        [
          {
            field: 'id',
            message: 'El identificador debe ser un número entero positivo',
          },
        ],
      );
    }

    const turnoExistente = turnosService.obtenerPorId(id);

    if (!turnoExistente) {
      status = 404;

      throw new AppError(
        status,
        'Turno no encontrado',
        'RESOURCE_NOT_FOUND',
        [],
      );
    }

    const eliminado = turnosService.eliminarTurno(id);

    if (!eliminado) {
      status = 400;

      throw new AppError(
        status,
        'No se pudo eliminar el turno',
        'VALIDATION_ERROR',
        [],
      );
    }

    return void res.status(status).send();
  } catch (error) {
    next(error);
  }
}