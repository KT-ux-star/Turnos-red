import { Router } from 'express';
import * as medicosController from '../controllers/medicos.controller.js';

const router = Router();

router.get('/', medicosController.obtenerTodos);
router.get('/:id', medicosController.obtenerPorId);
router.post('/', medicosController.crearMedico);
router.put('/:id', medicosController.actualizarMedico);
router.delete('/:id', medicosController.eliminarMedico);

export default router;