import { TurnoCrudo, Turno } from '../types.js';
export declare function inicializarTurnos(): Promise<void>;
export declare function obtenerTodos(): Turno[];
export declare function obtenerPorId(id: number): Turno | undefined;
export declare function crearTurno(turnoCrudo: TurnoCrudo): Turno | null;
export declare function actualizarTurno(id: number, datosActualizados: Partial<TurnoCrudo>): Turno | null;
export declare function eliminarTurno(id: number): boolean;
//# sourceMappingURL=turnos.service.d.ts.map