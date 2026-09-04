import { normalizarTurno } from '../normalizador.js';
import { leerTurnosDelArchivo } from '../models/turnos.model.js';
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
// Operaciones CRUD
// Leer todos los turnos
export function obtenerTodos() {
    return turnosEnMemoria;
}
// Leer un turno por ID
export function obtenerPorId(id) {
    return turnosEnMemoria.find(turno => turno.id === id);
}
// Crear un nuevo turno
export function crearTurno(turnoCrudo) {
    const turnoNormalizado = normalizarTurno(turnoCrudo);
    if (turnoNormalizado) {
        turnosEnMemoria.push(turnoNormalizado);
        return turnoNormalizado;
    }
    return null;
}
// Actualizar un turno
export function actualizarTurno(id, datosActualizados) {
    const index = turnosEnMemoria.findIndex(turno => turno.id === id);
    const turnoActual = turnosEnMemoria[index];
    const turnoMezclado = { ...turnoActual, ...datosActualizados };
    const turnoNormalizado = normalizarTurno(turnoMezclado);
    if (turnoNormalizado) {
        turnosEnMemoria[index] = turnoNormalizado;
        return turnoNormalizado;
    }
    return null;
}
// Eliminar un turno
export function eliminarTurno(id) {
    const index = turnosEnMemoria.findIndex(turno => turno.id === id);
    if (index === -1)
        return false;
    turnosEnMemoria.splice(index, 1);
    return true;
}
//# sourceMappingURL=turnos.service.js.map