import express from 'express';
import { getMunicipiosById } from '../controllers/municipios.js';

const router = express.Router();

router.get('/:id', getMunicipiosById);

export default router;