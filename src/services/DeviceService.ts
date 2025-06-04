import { DeviceRepository } from '../repositories/DeviceRepository';

export class DeviceService {
  private repo = new DeviceRepository();

  async getAvailable() {
    return this.repo.getAvailableDevices();
  }

  async assign(user_id: number, device_id: number) {
    return this.repo.assignDevice(user_id, device_id);
  }

  async getUserHistory(user_id: number) {
    return this.repo.getAssignmentsByUser(user_id);
  }
}
