import { z } from 'zod';
export declare const turnoSchema: z.ZodObject<{
    paciente: z.ZodString;
    documento: z.ZodString;
    especialidad: z.ZodEnum<{
        "Cl\u00EDnica M\u00E9dica": "Clínica Médica";
        Pediatría: "Pediatría";
        Odontología: "Odontología";
        Nutrición: "Nutrición";
    }>;
    fecha: z.ZodString;
    hora: z.ZodString;
    confirmado: z.ZodUnion<readonly [z.ZodBoolean, z.ZodEnum<{
        si: "si";
        no: "no";
    }>]>;
    medicoId: z.ZodNumber;
    observaciones: z.ZodOptional<z.ZodString>;
    id: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
}, z.core.$strip>;
export declare const turnoUpdateSchema: z.ZodObject<{
    paciente: z.ZodOptional<z.ZodString>;
    documento: z.ZodOptional<z.ZodString>;
    especialidad: z.ZodOptional<z.ZodEnum<{
        "Cl\u00EDnica M\u00E9dica": "Clínica Médica";
        Pediatría: "Pediatría";
        Odontología: "Odontología";
        Nutrición: "Nutrición";
    }>>;
    fecha: z.ZodOptional<z.ZodString>;
    hora: z.ZodOptional<z.ZodString>;
    confirmado: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodEnum<{
        si: "si";
        no: "no";
    }>]>>;
    medicoId: z.ZodOptional<z.ZodNumber>;
    observaciones: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
//# sourceMappingURL=turnos.schema.d.ts.map