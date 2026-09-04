import fs from 'node:fs/promises';
import path from 'node:path';
export function normalizarTurno(crudo) {
    try {
        const id = Number(crudo.id);
        if (!Number.isInteger(id) || id <= 0) {
            return null; // Rechazar si no es válido
        }
        return {
            id,
            paciente: crudo.paciente.trim(), // Sanitizar espacios
            documento: String(crudo.documento), // De number a string
            especialidad: crudo.especialidad
                .toLowerCase()
                .split(' ')
                .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
                .join(' '),
            fecha: crudo.fecha,
            hora: crudo.hora,
            confirmado: crudo.confirmado.toLowerCase() === 'si', // "si"/"no" a boolean
        };
    }
    catch (error) {
        console.error('Error al normalizar turno:', error);
        return null;
    }
}
export async function leerTurnosDelArchivo() {
    try {
        const rutaArchivo = path.resolve('./data/turnos.json');
        const contenido = await fs.readFile(rutaArchivo, 'utf-8');
        return JSON.parse(contenido);
    }
    catch (error) {
        console.error('Error al leer el archivo de turnos:', error);
        throw error;
    }
}
//# sourceMappingURL=turnos.model.js.map