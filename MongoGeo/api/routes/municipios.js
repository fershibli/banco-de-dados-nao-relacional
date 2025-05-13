import express from 'express';
import { createMunicipio, getMunicipiosById } from '../controllers/municipios.js';
import { validateMunicipio } from '../middlewares/validations.js';
import auth from '../middlewares/autth.js';

const router = express.Router();

router.get('/:id', auth, getMunicipiosById);

router.post("/", validateMunicipio, createMunicipio)

export default router;