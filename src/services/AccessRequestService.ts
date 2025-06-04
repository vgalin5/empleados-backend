import { AccessRequest } from '../models/AccessRequest';
import { AccessRequestRepository } from '../repositories/AccessRequestRepository';
import { UserRepository } from '../repositories/UserRepository';

export class AccessRequestService {
  private repo = new AccessRequestRepository();
  private userRepo = new UserRepository(); // Usamos esto para obtener el rol del usuario

  private roleAccessMap: Record<string, string[]> = {
    "Backend Developer": ["GitHub", "Jira", "AWS"],
    "Frontend Developer": ["GitHub", "Jira"],
    "Diseñador": ["Figma"],
    "Tester QA": ["Jira"],
    "Líder Técnico": ["GitHub", "Jira", "AWS", "Slack"],
  };

  async create(request: AccessRequest) {
    const user = await this.userRepo.findById(request.user_id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const permitted = this.roleAccessMap[user.role];

    if (!permitted || !permitted.includes(request.access_type)) {
      throw new Error(`El rol "${user.role}" no tiene acceso permitido a ${request.access_type}`);
    }

    await this.repo.create(request);
  }

  async getByUser(userId: number): Promise<AccessRequest[]> {
    return this.repo.findByUser(userId);
  }
}
