import express from 'express';
import { createMunicipio, getMunicipiosById } from '../controllers/municipios.js';
import { validateMunicipio } from '../middlewares/validations.js';

const router = express.Router();

router.get('/:id', getMunicipiosById);

router.post("/", validateMunicipio, createMunicipio)

export default router;