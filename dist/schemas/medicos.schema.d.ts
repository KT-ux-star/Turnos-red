import { z } from 'zod';
export declare const especialidades: readonly ["Clínica Médica", "Pediatría", "Odontología", "Nutrición"];
export declare const medicoSchema: z.ZodObject<{
    nombre: z.ZodString;
    documento: z.ZodString;
    especialidad: z.ZodEnum<{
        "Cl\u00EDnica M\u00E9dica": "Clínica Médica";
        Pediatría: "Pediatría";
        Odontología: "Odontología";
        Nutrición: "Nutrición";
    }>;
    disponible: z.ZodBoolean;
}, z.core.$strip>;
export declare const medicoUpdateSchema: z.ZodObject<{
    nombre: z.ZodOptional<z.ZodString>;
    documento: z.ZodOptional<z.ZodString>;
    especialidad: z.ZodOptional<z.ZodEnum<{
        "Cl\u00EDnica M\u00E9dica": "Clínica Médica";
        Pediatría: "Pediatría";
        Odontología: "Odontología";
        Nutrición: "Nutrición";
    }>>;
    disponible: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
//# sourceMappingURL=medicos.schema.d.ts.map