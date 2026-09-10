import { Router } from 'express';
import * as turnosController from '../controllers/turnos.controller.js';
import { validate } from '../middlewares/validate.js';
import { turnoSchema, turnoUpdateSchema, } from '../schemas/turnos.schema.js';
const router = Router();
// Rutas CRUD para turnos
router.get('/', turnosController.obtenerTodos);
router.get('/:id', turnosController.obtenerPorId);
router.post('/', validate(turnoSchema), turnosController.crearTurno);
router.put('/:id', validate(turnoUpdateSchema), turnosController.actualizarTurno);
router.delete('/:id', turnosController.eliminarTurno);
export default router;
//# sourceMappingURL=turnos.routes.js.map