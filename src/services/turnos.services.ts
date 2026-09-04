import { TurnoCrudo, Turno, normalizarTurno, leerTurnosDelArchivo } from '../models/turnos.models.js';
import { emitirTurnoCreado, emitirTurnoActualizado, emitirTurnoEliminado } from '../events/turno.emitter.js';

let turnosEnMemoria: Turno[] = [];

// Inicializar: leer y normalizar turnos del archivo
export async function inicializarTurnos(): Promise<void> {
  try {
    const turnosCrudos = await leerTurnosDelArchivo() as TurnoCrudo[];
    
    let aceptados = 0;
    let rechazados = 0;

    for (const turnoCrudo of turnosCrudos) {
      const turnoNormalizado = normalizarTurno(turnoCrudo);
      if (turnoNormalizado) {
        turnosEnMemoria.push(turnoNormalizado);
        aceptados++;
      } else {
        rechazados++;
      }
    }

    console.log(`✅ Turnos aceptados: ${aceptados}`);
    console.log(`❌ Turnos rechazados: ${rechazados}`);
  } catch (error) {
    console.error('Error al inicializar turnos:', error);
    throw error;
  }
}


export function obtenerTodos(): Turno[] {
  return turnosEnMemoria;
}


export function obtenerPorId(id: number): Turno | undefined {
  return turnosEnMemoria.find(turno => turno.id === id);
}


export function crearTurno(turnoCrudo: TurnoCrudo): Turno | null {
  const turnoNormalizado = normalizarTurno(turnoCrudo);
  if (turnoNormalizado) {
    turnosEnMemoria.push(turnoNormalizado);
    emitirTurnoCreado(turnoNormalizado); 
    return turnoNormalizado;
  }
  return null;
}


export function actualizarTurno(id: number, datosActualizados: Partial<TurnoCrudo>): Turno | null {
  const index = turnosEnMemoria.findIndex(turno => turno.id === id);
  if (index === -1) return null;

  const turnoActual = turnosEnMemoria[index];
  const turnoMezclado = { ...turnoActual, ...datosActualizados };
  const turnoNormalizado = normalizarTurno(turnoMezclado as TurnoCrudo);

  if (turnoNormalizado) {
    turnosEnMemoria[index] = turnoNormalizado;
    emitirTurnoActualizado(turnoNormalizado);
    return turnoNormalizado;
  }
  return null;
}


export function eliminarTurno(id: number): boolean {
  const index = turnosEnMemoria.findIndex(turno => turno.id === id);
  if (index === -1) return false;

  turnosEnMemoria.splice(index, 1);
  emitirTurnoEliminado(id);  // ← NUEVA LÍNEA
  return true;
}