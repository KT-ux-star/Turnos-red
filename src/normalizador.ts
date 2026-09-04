import { TurnoCrudo, Turno } from './models/turnos.models.js';

/**
 * Normaliza un turno crudo a un turno válido del dominio
 * - Convierte id de string a number
 * - Convierte documento a string
 * - Limpia espacios en blanco del paciente
 * - Normaliza especialidad a Title Case
 * - Convierte confirmado a booleano
 */
export function normalizarTurno(turnoCrudo: TurnoCrudo): Turno | null {
  try {
    // Validar y convertir id
    const id = Number(turnoCrudo.id);
    if (!Number.isInteger(id) || id <= 0) {
      return null;
    }

    // Normalizar documento a string
    const documento = String(turnoCrudo.documento).trim();
    if (!documento) {
      return null;
    }

    // Limpiar y validar paciente
    const paciente = String(turnoCrudo.paciente).trim();
    if (!paciente) {
      return null;
    }

    // Normalizar especialidad a Title Case
    const especialidad = String(turnoCrudo.especialidad)
      .toLowerCase()
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');

    // Validar fecha (formato básico)
    const fecha = String(turnoCrudo.fecha).trim();
    if (!fecha) {
      return null;
    }

    // Validar hora
    const hora = String(turnoCrudo.hora).trim();
    if (!hora) {
      return null;
    }

    // Convertir confirmado a booleano
    let confirmado: boolean;
    if (typeof turnoCrudo.confirmado === 'boolean') {
      confirmado = turnoCrudo.confirmado;
    } else {
      confirmado = String(turnoCrudo.confirmado).toLowerCase() === 'si';
    }

    // Retornar turno normalizado
    return {
      id,
      paciente,
      documento,
      especialidad,
      fecha,
      hora,
      confirmado,
    };
  } catch (error) {
    // Si algo falla, retorna null para descartar este registro
    return null;
  }
}