import { Request, Response } from 'express';
import { DeviceService } from '../services/DeviceService';

const service = new DeviceService();

export class DeviceController {
  async listAvailable(req: Request, res: Response) {
    try {
      const data = await service.getAvailable();
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: '❌ Error al obtener inventario' });
    }
  }

  async assign(req: Request, res: Response) {
    try {
      const { user_id, device_id } = req.body;
      await service.assign(user_id, device_id);
      res.json({ message: '✅ Computador asignado con éxito' });
    } catch (e) {
      res.status(500).json({ message: '❌ Error al asignar computador' });
    }
  }

  async userHistory(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const data = await service.getUserHistory(userId);
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: '❌ Error al obtener historial' });
    }
  }
}
