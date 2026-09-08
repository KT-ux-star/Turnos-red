import { AppError } from '../errors/app.error.js';
import * as turnosService from '../services/turnos.services.js';
export function obtenerTodos(_req, res) {
    const turnos = turnosService.obtenerTodos();
    res.status(200).json(turnos);
}
export function obtenerPorId(req, res, next) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        next(new AppError(400, 'ID inválido', 'VALIDATION_ERROR', [
            {
                field: 'id',
                message: 'El identificador debe ser un número entero positivo',
            },
        ]));
        return;
    }
    const turno = turnosService.obtenerPorId(id);
    if (!turno) {
        next(new AppError(404, 'Turno no encontrado', 'RESOURCE_NOT_FOUND', []));
        return;
    }
    res.status(200).json(turno);
}
export function crearTurno(req, res, next) {
    const turnoCrudo = req.body;
    const turno = turnosService.crearTurno(turnoCrudo);
    if (!turno) {
        next(new AppError(400, 'No se pudo crear el turno. Los datos son inválidos', 'VALIDATION_ERROR', []));
        return;
    }
    res.status(201).json(turno);
}
export function actualizarTurno(req, res, next) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        next(new AppError(400, 'ID inválido', 'VALIDATION_ERROR', [
            {
                field: 'id',
                message: 'El identificador debe ser un número entero positivo',
            },
        ]));
        return;
    }
    const turnoExistente = turnosService.obtenerPorId(id);
    if (!turnoExistente) {
        next(new AppError(404, 'Turno no encontrado', 'RESOURCE_NOT_FOUND', []));
        return;
    }
    const datosActualizados = req.body;
    const turno = turnosService.actualizarTurno(id, datosActualizados);
    if (!turno) {
        next(new AppError(400, 'No se pudo actualizar el turno. Los datos son inválidos', 'VALIDATION_ERROR', []));
        return;
    }
    res.status(200).json(turno);
}
export function eliminarTurno(req, res, next) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        next(new AppError(400, 'ID inválido', 'VALIDATION_ERROR', [
            {
                field: 'id',
                message: 'El identificador debe ser un número entero positivo',
            },
        ]));
        return;
    }
    const eliminado = turnosService.eliminarTurno(id);
    if (!eliminado) {
        next(new AppError(404, 'Turno no encontrado', 'RESOURCE_NOT_FOUND', []));
        return;
    }
    res.status(204).send();
}
//# sourceMappingURL=turnos.controller.js.map