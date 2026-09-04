import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { turnoEmitter } from './turno.emitter.js';
import { Turno } from '../models/turnos.models.js';

// Crear instancia de Socket.IO
let io: SocketIOServer;

export function inicializarSocket(httpServer: HTTPServer): SocketIOServer {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // Cuando un cliente se conecta
  io.on('connection', (socket: Socket) => {
    console.log(`✅ Cliente conectado: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`❌ Cliente desconectado: ${socket.id}`);
    });
  });

  // Escuchar eventos del EventEmitter y retransmitirlos a clientes
  turnoEmitter.on('turno:creado', (turno: Turno) => {
    console.log(`📢 Evento emitido a clientes: turno:creado - ID ${turno.id}`);
    io.emit('turno:creado', turno);
  });

  turnoEmitter.on('turno:actualizado', (turno: Turno) => {
    console.log(`📢 Evento emitido a clientes: turno:actualizado - ID ${turno.id}`);
    io.emit('turno:actualizado', turno);
  });

  turnoEmitter.on('turno:eliminado', (id: number) => {
    console.log(`📢 Evento emitido a clientes: turno:eliminado - ID ${id}`);
    io.emit('turno:eliminado', id);
  });

  return io;
}

export function getIO(): SocketIOServer {
  return io;
}