import { EventEmitter } from 'events';
import { Turno } from '../models/turnos.models.js';
export declare const turnoEmitter: EventEmitter<any>;
export declare function emitirTurnoCreado(turno: Turno): void;
export declare function emitirTurnoActualizado(turno: Turno): void;
export declare function emitirTurnoEliminado(id: number): void;
//# sourceMappingURL=turno.emitter.d.ts.map