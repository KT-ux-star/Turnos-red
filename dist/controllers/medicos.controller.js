import { AppError } from '../errors/app.error.js';
import * as medicosService from '../services/medicos.service.js';
export function obtenerTodos(_req, res) {
    const medicos = medicosService.obtenerTodos();
    res.status(200).json(medicos);
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
    const medico = medicosService.obtenerPorId(id);
    if (!medico) {
        next(new AppError(404, 'Médico no encontrado', 'RESOURCE_NOT_FOUND', []));
        return;
    }
    res.status(200).json(medico);
}
export function crearMedico(req, res) {
    const datos = req.body;
    const medico = medicosService.crearMedico(datos);
    res.status(201).json(medico);
}
export function actualizarMedico(req, res, next) {
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
    const datos = req.body;
    const medico = medicosService.actualizarMedico(id, datos);
    if (!medico) {
        next(new AppError(404, 'Médico no encontrado', 'RESOURCE_NOT_FOUND', []));
        return;
    }
    res.status(200).json(medico);
}
export function eliminarMedico(req, res, next) {
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
    const eliminado = medicosService.eliminarMedico(id);
    if (!eliminado) {
        next(new AppError(404, 'Médico no encontrado', 'RESOURCE_NOT_FOUND', []));
        return;
    }
    res.status(204).send();
}
//# sourceMappingURL=medicos.controller.js.map