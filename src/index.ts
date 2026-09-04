import express from 'express';
import http from 'http';
import turnosRoutes from './routes/turnos.routes.js';
import * as turnosService from './services/turnos.services.js';
import { inicializarSocket } from './events/socket.js';

const app = express();
const httpServer = http.createServer(app);
const puerto = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Registrar rutas
app.use('/turnos', turnosRoutes);

// Inicializar Socket.IO
inicializarSocket(httpServer);

// Iniciar servidor HTTP
httpServer.listen(puerto, () => {
  console.log(`🚀 Servidor corriendo en puerto ${puerto}`);
});

// Cargar datos de turnos al iniciar
async function iniciar() {
  try {
    await turnosService.inicializarTurnos();
  } catch (error) {
    console.error('Error al cargar turnos:', error);
  }
}

iniciar();