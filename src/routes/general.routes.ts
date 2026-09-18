import { Router } from 'express';
import * as generalController from '../controllers/general.controller.js';

const router = Router();

router.get('/', generalController.helloWorld);

export default router;