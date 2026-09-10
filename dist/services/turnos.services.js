import { normalizarTurno, leerTurnosDelArchivo } from '../models/turnos.models.js';
import { emitirTurnoCreado, emitirTurnoActualizado, emitirTurnoEliminado } from '../events/turno.emitter.js';
let turnosEnMemoria = [];
// Inicializar: leer y normalizar turnos del archivo
export async function inicializarTurnos() {
    try {
        const turnosCrudos = await leerTurnosDelArchivo();
        let aceptados = 0;
        let rechazados = 0;
        for (const turnoCrudo of turnosCrudos) {
            const turnoNormalizado = normalizarTurno(turnoCrudo);
            if (turnoNormalizado) {
                turnosEnMemoria.push(turnoNormalizado);
                aceptados++;
            }
            else {
                rechazados++;
            }
        }
        console.log(`✅ Turnos aceptados: ${aceptados}`);
        console.log(`❌ Turnos rechazados: ${rechazados}`);
    }
    catch (error) {
        console.error('Error al inicializar turnos:', error);
        throw error;
    }
}
export function obtenerTodos(filtros = {}) {
    const normalizarTexto = (valor) => valor
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    return turnosEnMemoria.filter((turno) => {
        const coincideEspecialidad = !filtros.especialidad ||
            normalizarTexto(turno.especialidad) ===
                normalizarTexto(filtros.especialidad);
        const coincideFecha = !filtros.fecha || turno.fecha === filtros.fecha;
        const coincideMedico = filtros.medicoId === undefined ||
            turno.medicoId === filtros.medicoId;
        return coincideEspecialidad && coincideFecha && coincideMedico;
    });
}
export function obtenerPorId(id) {
    return turnosEnMemoria.find(turno => turno.id === id);
}
export function crearTurno(turnoCrudo) {
    const turnoNormalizado = normalizarTurno(turnoCrudo);
    if (turnoNormalizado) {
        turnosEnMemoria.push(turnoNormalizado);
        emitirTurnoCreado(turnoNormalizado);
        return turnoNormalizado;
    }
    return null;
}
export function actualizarTurno(id, datosActualizados) {
    const index = turnosEnMemoria.findIndex(turno => turno.id === id);
    if (index === -1)
        return null;
    const turnoActual = turnosEnMemoria[index];
    const turnoMezclado = { ...turnoActual, ...datosActualizados };
    const turnoNormalizado = normalizarTurno(turnoMezclado);
    if (turnoNormalizado) {
        turnosEnMemoria[index] = turnoNormalizado;
        emitirTurnoActualizado(turnoNormalizado);
        return turnoNormalizado;
    }
    return null;
}
export function eliminarTurno(id) {
    const index = turnosEnMemoria.findIndex(turno => turno.id === id);
    if (index === -1)
        return false;
    turnosEnMemoria.splice(index, 1);
    emitirTurnoEliminado(id); // ← NUEVA LÍNEA
    return true;
}
//# sourceMappingURL=turnos.services.js.map