import { EventEmitter } from 'events';
import { Turno } from '../models/turnos.models.js';

// Crear una instancia global del EventEmitter
export const turnoEmitter = new EventEmitter();

// Funciones para emitir eventos
export function emitirTurnoCreado(turno: Turno): void {
  turnoEmitter.emit('turno:creado', turno);
}

export function emitirTurnoActualizado(turno: Turno): void {
  turnoEmitter.emit('turno:actualizado', turno);
}

export function emitirTurnoEliminado(id: number): void {
  turnoEmitter.emit('turno:eliminado', id);
}