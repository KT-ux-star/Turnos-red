import { z } from 'zod';
import { especialidades } from './medicos.schema.js';

const turnoDataSchema = z.object({
  paciente: z
    .string()
    .trim()
    .min(3, 'El paciente debe tener al menos 3 caracteres'),
  documento: z
    .string()
    .trim()
    .min(7, 'El documento debe tener al menos 7 caracteres'),
  especialidad: z.enum(especialidades, {
    message: 'La especialidad no es válida',
  }),
  fecha: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'La fecha debe tener formato DD/MM/AAAA'),
  hora: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'La hora debe tener formato HH:MM'),
  confirmado: z.union([z.boolean(), z.enum(['si', 'no'])]),
  medicoId: z
    .number()
    .int('El ID del médico debe ser un número entero')
    .positive('El ID del médico debe ser positivo'),
  observaciones: z.string().trim().optional(),
});

export const turnoSchema = turnoDataSchema.extend({
  id: z.union([
    z.string().trim().regex(/^\d+$/, 'El ID debe ser numérico'),
    z.number().int().positive(),
  ]),
});

export const turnoUpdateSchema = turnoDataSchema
  .partial()
  .refine((datos) => Object.keys(datos).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar',
  });