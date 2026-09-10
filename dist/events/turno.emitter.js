import { EventEmitter } from 'events';
// Crear una instancia global del EventEmitter
export const turnoEmitter = new EventEmitter();
// Funciones para emitir eventos
export function emitirTurnoCreado(turno) {
    turnoEmitter.emit('turno:creado', turno);
}
export function emitirTurnoActualizado(turno) {
    turnoEmitter.emit('turno:actualizado', turno);
}
export function emitirTurnoEliminado(id) {
    turnoEmitter.emit('turno:eliminado', id);
}
//# sourceMappingURL=turno.emitter.js.map