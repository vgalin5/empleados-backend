import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  private repo = new UserRepository();

  async createUser(user: User) {
    await this.repo.create(user);
  }

  async listUsers(): Promise<User[]> {
    return this.repo.findAll();
  }

  async updateUserStatus(id: number, status: 'aprobado' | 'rechazado') {
  await this.repo.updateStatus(id, status);
}

  
}
