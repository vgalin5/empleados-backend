import { Request, Response } from 'express';
import { AccessRequestService } from '../services/AccessRequestService';

const service = new AccessRequestService();

export class AccessRequestController {
  async create(req: Request, res: Response) {
    try {
      await service.create(req.body);
      res.status(201).json({ message: '✅ Solicitud registrada' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '❌ Error al registrar la solicitud' });
    }
  }

  async listByUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const data = await service.getByUser(userId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: '❌ Error al obtener solicitudes' });
    }
  }
}
