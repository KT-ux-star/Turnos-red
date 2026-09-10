let medicos = [
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
export function obtenerTodos(filtros = {}) {
    const normalizarTexto = (valor) => valor
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    return medicos.filter((medico) => {
        const coincideEspecialidad = !filtros.especialidad ||
            normalizarTexto(medico.especialidad) ===
                normalizarTexto(filtros.especialidad);
        const coincideDisponibilidad = filtros.disponible === undefined ||
            medico.disponible === filtros.disponible;
        return coincideEspecialidad && coincideDisponibilidad;
    });
}
export function obtenerPorId(id) {
    return medicos.find((medico) => medico.id === id);
}
export function crearMedico(datos) {
    const nuevoId = Math.max(0, ...medicos.map((medico) => medico.id)) + 1;
    const medico = {
        id: nuevoId,
        ...datos,
    };
    medicos.push(medico);
    return medico;
}
export function actualizarMedico(id, datos) {
    const medico = obtenerPorId(id);
    if (!medico) {
        return undefined;
    }
    Object.assign(medico, datos);
    return medico;
}
export function eliminarMedico(id) {
    const indice = medicos.findIndex((medico) => medico.id === id);
    if (indice === -1) {
        return false;
    }
    medicos.splice(indice, 1);
    return true;
}
//# sourceMappingURL=medicos.service.js.map