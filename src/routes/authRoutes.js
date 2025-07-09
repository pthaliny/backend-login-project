//Rotas de acesso ao usuário de autenticação
import express from 'express';
import { loginAccess } from '../controllers/authController.js';

const router = express.Router();
router.post('/login', loginAccess);
router.post('/logout', logoutAccess);

export default router;