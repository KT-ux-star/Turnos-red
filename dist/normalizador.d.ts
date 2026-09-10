import { TurnoCrudo, Turno } from './models/turnos.models.js';
/**
 * Normaliza un turno crudo a un turno válido del dominio
 * - Convierte id de string a number
 * - Convierte documento a string
 * - Limpia espacios en blanco del paciente
 * - Normaliza especialidad a Title Case
 * - Convierte confirmado a booleano
 */
export declare function normalizarTurno(turnoCrudo: TurnoCrudo): Turno | null;
//# sourceMappingURL=normalizador.d.ts.map