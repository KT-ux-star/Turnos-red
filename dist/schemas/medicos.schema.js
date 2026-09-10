import { z } from 'zod';
export const especialidades = [
    'Clínica Médica',
    'Pediatría',
    'Odontología',
    'Nutrición',
];
export const medicoSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    documento: z
        .string()
        .trim()
        .min(7, 'El documento debe tener al menos 7 caracteres'),
    especialidad: z.enum(especialidades, {
        message: 'La especialidad no es válida',
    }),
    disponible: z.boolean(),
});
export const medicoUpdateSchema = medicoSchema
    .partial()
    .refine((datos) => Object.keys(datos).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar',
});
//# sourceMappingURL=medicos.schema.js.map