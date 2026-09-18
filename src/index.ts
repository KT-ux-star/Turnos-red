import express from 'express';
import http from 'http';

import turnosRoutes from './routes/turnos.routes.js';
import medicosRoutes from './routes/medicos.routes.js';
import generalRoutes from './routes/general.routes.js';

import * as generalController from './controllers/general.controller.js';
import * as turnosService from './services/turnos.services.js';

import { inicializarSocket } from './events/socket.js';
import { errorHandler } from './middlewares/error.handler.js';

const app = express();
const httpServer = http.createServer(app);
const puerto = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rutas
app.use('/', generalRoutes);
app.use('/turnos', turnosRoutes);
app.use('/medicos', medicosRoutes);

// Ruta no encontrada
app.use(generalController.rutaNoEncontrada);

// Middleware centralizado de errores
app.use(errorHandler);

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