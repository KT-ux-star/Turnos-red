export interface TurnoCrudo {
    id: string | number;
    paciente: string;
    documento: string | number;
    especialidad: string;
    fecha: string;
    hora: string;
    confirmado: string | boolean;
    medicoId?: number;
    observaciones?: string;
}
export interface Turno {
    id: number;
    paciente: string;
    documento: string;
    especialidad: string;
    fecha: string;
    hora: string;
    confirmado: boolean;
    medicoId?: number;
    observaciones?: string;
}
export declare function normalizarTurno(crudo: TurnoCrudo): Turno | null;
export declare function leerTurnosDelArchivo(): Promise<TurnoCrudo[]>;
//# sourceMappingURL=turnos.models.d.ts.map