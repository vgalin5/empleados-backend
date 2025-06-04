import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const service = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      await service.createUser(req.body);
      res.status(201).json({ message: '✅ Usuario registrado con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '❌ Error al registrar usuario' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const users = await service.listUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: '❌ Error al obtener usuarios' });
    }
  }

  async approve(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await service.updateUserStatus(id, 'aprobado');
    res.json({ message: '✅ Usuario aprobado' });
  } catch (error) {
    res.status(500).json({ message: '❌ Error al aprobar usuario' });
  }
  
}

async reject(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await service.updateUserStatus(id, 'rechazado');
    res.json({ message: '⛔ Usuario rechazado' });
  } catch (error) {
    res.status(500).json({ message: '❌ Error al rechazar usuario' });
  }
}

}
