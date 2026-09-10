import type { Medico } from '../models/medicos.models.js';
export interface FiltrosMedicos {
    especialidad?: string;
    disponible?: boolean;
}
export declare function obtenerTodos(filtros?: FiltrosMedicos): Medico[];
export declare function obtenerPorId(id: number): Medico | undefined;
export declare function crearMedico(datos: Omit<Medico, 'id'>): Medico;
export declare function actualizarMedico(id: number, datos: Partial<Omit<Medico, 'id'>>): Medico | undefined;
export declare function eliminarMedico(id: number): boolean;
//# sourceMappingURL=medicos.service.d.ts.map