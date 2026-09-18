import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.error.js';
import type { Medico } from '../models/medicos.models.js';
import * as medicosService from '../services/medicos.service.js';

export async function obtenerTodos(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  let status = 200;

  try {
    const { especialidad, disponible } = req.query;

    let disponibleBooleano: boolean | undefined;
    

    if (disponible !== undefined) {
      if (disponible !== 'true' && disponible !== 'false') {
        status = 400;

        throw new AppError(
          status,
          'disponible inválido',
          'VALIDATION_ERROR',
          [
            {
              field: 'disponible',
              message: 'Debe ser true o false',
            },
          ],
        );
      }

      disponibleBooleano = disponible === 'true';
    }

    const medicos = medicosService.obtenerTodos({
      especialidad:
        typeof especialidad === 'string' ? especialidad : undefined,
      disponible: disponibleBooleano,
    });

    return void res.status(status).json(medicos);
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

    const medico = medicosService.obtenerPorId(id);

    if (!medico) {
      status = 404;

      throw new AppError(
        status,
        'Médico no encontrado',
        'RESOURCE_NOT_FOUND',
        [],
      );
    }

    return void res.status(status).json(medico);
  } catch (error) {
    next(error);
  }
}

export async function crearMedico(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  let status = 201;

  try {
    const datos: Omit<Medico, 'id'> = req.body;

    const medico = medicosService.crearMedico(datos);

    if (!medico) {
      status = 400;

      throw new AppError(
        status,
        'No se pudo crear el médico. Los datos son inválidos',
        'VALIDATION_ERROR',
        [],
      );
    }

    return void res.status(status).json(medico);
  } catch (error) {
    next(error);
  }
}

export async function actualizarMedico(
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

    const medicoExistente = medicosService.obtenerPorId(id);

    if (!medicoExistente) {
      status = 404;

      throw new AppError(
        status,
        'Médico no encontrado',
        'RESOURCE_NOT_FOUND',
        [],
      );
    }

    const datos: Partial<Omit<Medico, 'id'>> = req.body;

    const medico = medicosService.actualizarMedico(id, datos);

    if (!medico) {
      status = 400;

      throw new AppError(
        status,
        'No se pudo actualizar el médico. Los datos son inválidos',
        'VALIDATION_ERROR',
        [],
      );
    }

    return void res.status(status).json(medico);
  } catch (error) {
    next(error);
  }
}

export async function eliminarMedico(
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

    const medicoExistente = medicosService.obtenerPorId(id);

    if (!medicoExistente) {
      status = 404;

      throw new AppError(
        status,
        'Médico no encontrado',
        'RESOURCE_NOT_FOUND',
        [],
      );
    }

    const eliminado = medicosService.eliminarMedico(id);

    if (!eliminado) {
      status = 400;

      throw new AppError(
        status,
        'No se pudo eliminar el médico',
        'VALIDATION_ERROR',
        [],
      );
    }

    return void res.status(status).send();
  } catch (error) {
    next(error); 
  }
}