import express from 'express';
import { insereUsuario } from '../controllers/usuarios.js';
import { validateUsuario } from '../middlewares/validations.js';

const router = express.Router();

// Rota para inserir um novo usuário
router.post('/', validateUsuario, insereUsuario);

export default router;