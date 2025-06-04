import { pool } from '../config/db';
import { DeviceAssignment } from '../models/DeviceAssignment';
import { Device } from '../models/Device';

export class DeviceRepository {
  async getAvailableDevices(): Promise<Device[]> {
    const res = await pool.query('SELECT * FROM devices WHERE available = true');
    return res.rows;
  }

  async assignDevice(user_id: number, device_id: number): Promise<void> {
    await pool.query('BEGIN');
    await pool.query(
      'INSERT INTO device_assignments (user_id, device_id) VALUES ($1, $2)',
      [user_id, device_id]
    );
    await pool.query(
      'UPDATE devices SET available = false WHERE id = $1',
      [device_id]
    );
    await pool.query('COMMIT');
  }

  async getAssignmentsByUser(user_id: number): Promise<DeviceAssignment[]> {
    const res = await pool.query(
      `SELECT da.*, d.serial_number, d.model
       FROM device_assignments da
       JOIN devices d ON da.device_id = d.id
       WHERE da.user_id = $1`,
      [user_id]
    );
    return res.rows;
  }
}
