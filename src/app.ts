import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { pool } from './config/db';
import userRoutes from './routes/user.routes';
import accessRoutes from './routes/access.routes';
import deviceRoutes from './routes/device.routes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/access-requests', accessRoutes);
app.use('/api/devices', deviceRoutes);

// Ruta de prueba
app.get('/ping', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`🟢 Conectado a la base de datos: ${result.rows[0].now}`);
  } catch (error) {
    console.error('❌ Error al conectar con la DB:', error);
    res.status(500).send('🔴 Error de conexión a la base de datos');
  }
});

export default app;
