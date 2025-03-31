import express from 'express';
import { createMunicipio, getMunicipiosById } from '../controllers/municipios.js';

const router = express.Router();

router.get('/:id', getMunicipiosById);

router.post("/", createMunicipio)

export default router;