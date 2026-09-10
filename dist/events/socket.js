import { Server as SocketIOServer } from 'socket.io';
import { turnoEmitter } from './turno.emitter.js';
// Crear instancia de Socket.IO
let io;
export function inicializarSocket(httpServer) {
    io = new SocketIOServer(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    // Cuando un cliente se conecta
    io.on('connection', (socket) => {
        console.log(`✅ Cliente conectado: ${socket.id}`);
        socket.on('disconnect', () => {
            console.log(`❌ Cliente desconectado: ${socket.id}`);
        });
    });
    // Escuchar eventos del EventEmitter y retransmitirlos a clientes
    turnoEmitter.on('turno:creado', (turno) => {
        console.log(`📢 Evento emitido a clientes: turno:creado - ID ${turno.id}`);
        io.emit('turno:creado', turno);
    });
    turnoEmitter.on('turno:actualizado', (turno) => {
        console.log(`📢 Evento emitido a clientes: turno:actualizado - ID ${turno.id}`);
        io.emit('turno:actualizado', turno);
    });
    turnoEmitter.on('turno:eliminado', (id) => {
        console.log(`📢 Evento emitido a clientes: turno:eliminado - ID ${id}`);
        io.emit('turno:eliminado', id);
    });
    return io;
}
export function getIO() {
    return io;
}
//# sourceMappingURL=socket.js.map