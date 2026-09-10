/**
 * TurnoCrudo: representa los datos heterogéneos que vienen del archivo JSON
 * (sin normalizar, con inconsistencias)
 */
export interface TurnoCrudo {
    id: string | number;
    paciente: string;
    documento: string | number;
    especialidad: string;
    fecha: string;
    hora: string;
    confirmado: string | boolean;
}
/**
 * Turno: representa los datos normalizados y limpios que usa la aplicación
 * Todas las propiedades son consistentes y validadas
 */
export interface Turno {
    id: number;
    paciente: string;
    documento: string;
    especialidad: string;
    fecha: string;
    hora: string;
    confirmado: boolean;
    observaciones?: string;
}
//# sourceMappingURL=types.d.ts.map