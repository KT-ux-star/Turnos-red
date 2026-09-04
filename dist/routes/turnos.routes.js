import { Router } from 'express';
import * as turnosController from '../controllers/turnos.controller.js';
const router = Router();
// Rutas CRUD para turnos
router.get('/', turnosController.obtenerTodos);
router.get('/:id', turnosController.obtenerPorId);
router.post('/', turnosController.crearTurno);
router.put('/:id', turnosController.actualizarTurno);
router.delete('/:id', turnosController.eliminarTurno);
export default router;
//# sourceMappingURL=turnos.routes.js.map