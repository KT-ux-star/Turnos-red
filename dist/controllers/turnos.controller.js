import * as turnosService from '../services/turnos.services.js';
export function obtenerTodos(req, res) {
    const turnos = turnosService.obtenerTodos();
    res.status(200).json(turnos);
}
export function obtenerPorId(req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    const turno = turnosService.obtenerPorId(id);
    if (!turno) {
        res.status(404).json({ error: 'Turno no encontrado' });
        return;
    }
    res.status(200).json(turno);
}
export function crearTurno(req, res) {
    const turnoCrudo = req.body;
    const turno = turnosService.crearTurno(turnoCrudo);
    if (!turno) {
        res.status(400).json({ error: 'No se pudo crear el turno. Datos inválidos.' });
        return;
    }
    res.status(201).json(turno);
}
export function actualizarTurno(req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    const datosActualizados = req.body;
    const turno = turnosService.actualizarTurno(id, datosActualizados);
    if (!turno) {
        res.status(404).json({ error: 'Turno no encontrado o datos inválidos' });
        return;
    }
    res.status(200).json(turno);
}
export function eliminarTurno(req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    const eliminado = turnosService.eliminarTurno(id);
    if (!eliminado) {
        res.status(404).json({ error: 'Turno no encontrado' });
        return;
    }
    res.status(204).send();
}
//# sourceMappingURL=turnos.controller.js.map