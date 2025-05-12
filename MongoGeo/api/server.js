
import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from '../config/db.js';
import municipiosRoutes from './routes/municipios.js';
import usuariosRoutes from './routes/usuarios.js';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// public routes
app.use('/', express.static('public'));
// api routes
app.use('/api/municipios', municipiosRoutes);
app.use('/api/usuarios', usuariosRoutes);
// favicon
app.use('/favicon.ico', express.static('public/images/logo.png'));

connectToDatabase(app)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error starting the server', error);
    });