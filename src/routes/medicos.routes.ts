import { Router } from 'express';
import * as medicosController from '../controllers/medicos.controller.js';
import { validate } from '../middlewares/validate.js';
import {
  medicoSchema,
  medicoUpdateSchema,
} from '../schemas/medicos.schema.js';

const router = Router();

router.get('/', medicosController.obtenerTodos);
router.get('/:id', medicosController.obtenerPorId);
router.post('/', validate(medicoSchema), medicosController.crearMedico);

router.put(
  '/:id',
  validate(medicoUpdateSchema),
  medicosController.actualizarMedico,
);
router.delete('/:id', medicosController.eliminarMedico);

export default router;