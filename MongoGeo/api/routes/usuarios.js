import express from 'express';
import { efetuaLogin, insereUsuario } from '../controllers/usuarios.js';
import { validateUsuario } from '../middlewares/validations.js';

const router = express.Router();

// Rota para inserir um novo usuário
router.post('/', validateUsuario, insereUsuario);

// Rota para efetuar login
router.post('/login', efetuaLogin);

export default router;