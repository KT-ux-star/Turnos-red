import fs from 'node:fs/promises';
import path from 'node:path';

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

export function normalizarTurno(crudo: TurnoCrudo): Turno | null {
  try {
    const id = Number(crudo.id);

    if (!Number.isInteger(id) || id <= 0) {
      return null;
    }

    const paciente = crudo.paciente.trim();
    const documento = String(crudo.documento).trim();

    if (!paciente || !documento) {
      return null;
    }

    if (
      crudo.medicoId !== undefined &&
      (!Number.isInteger(crudo.medicoId) || crudo.medicoId <= 0)
    ) {
      return null;
    }

    const confirmado =
      typeof crudo.confirmado === 'boolean'
        ? crudo.confirmado
        : crudo.confirmado.toLowerCase() === 'si';

    return {
      id,
      paciente,
      documento,
      especialidad: crudo.especialidad
        .toLowerCase()
        .split(' ')
        .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' '),
      fecha: crudo.fecha,
      hora: crudo.hora,
      confirmado,
      medicoId: crudo.medicoId,
      observaciones: crudo.observaciones?.trim(),
    };
  } catch (error) {
    console.error('Error al normalizar turno:', error);
    return null;
  }
}

export async function leerTurnosDelArchivo(): Promise<TurnoCrudo[]> {
  try {
    const rutaArchivo = path.resolve('./data/turnos.json');
    const contenido = await fs.readFile(rutaArchivo, 'utf-8');
    return JSON.parse(contenido);
  } catch (error) {
    console.error('Error al leer el archivo de turnos:', error);
    throw error;
  }
}