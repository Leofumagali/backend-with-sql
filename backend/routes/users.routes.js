import { Router } from 'express';
import { criarUsuario } from '../controllers/users.controller.js';

const router = Router();

router.post('/usuarios', criarUsuario);

export default router;