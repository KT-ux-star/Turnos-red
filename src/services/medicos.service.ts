import type { Medico } from '../models/medicos.models.js';

let medicos: Medico[] = [
  {
    id: 1,
    nombre: 'Dra. Laura Gómez',
    documento: '28567890',
    especialidad: 'Clínica Médica',
    disponible: true,
  },
  {
    id: 2,
    nombre: 'Dr. Martín Pérez',
    documento: '30123456',
    especialidad: 'Pediatría',
    disponible: true,
  },
];

export function obtenerTodos(): Medico[] {
  return medicos;
}

export function obtenerPorId(id: number): Medico | undefined {
  return medicos.find((medico) => medico.id === id);
}

export function crearMedico(datos: Omit<Medico, 'id'>): Medico {
  const nuevoId = Math.max(0, ...medicos.map((medico) => medico.id)) + 1;

  const medico: Medico = {
    id: nuevoId,
    ...datos,
  };

  medicos.push(medico);
  return medico;
}

export function actualizarMedico(
  id: number,
  datos: Partial<Omit<Medico, 'id'>>,
): Medico | undefined {
  const medico = obtenerPorId(id);

  if (!medico) {
    return undefined;
  }

  Object.assign(medico, datos);
  return medico;
}

export function eliminarMedico(id: number): boolean {
  const indice = medicos.findIndex((medico) => medico.id === id);

  if (indice === -1) {
    return false;
  }

  medicos.splice(indice, 1);
  return true;
}
