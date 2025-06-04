import { pool } from '../config/db';
import { AccessRequest } from '../models/AccessRequest';

export class AccessRequestRepository {
  async create(request: AccessRequest): Promise<void> {
    const { user_id, access_type } = request;
    await pool.query(
      'INSERT INTO access_requests (user_id, access_type, status) VALUES ($1, $2, $3)',
      [user_id, access_type, 'pendiente']
    );
  }

  async findByUser(userId: number): Promise<AccessRequest[]> {
    const result = await pool.query('SELECT * FROM access_requests WHERE user_id = $1', [userId]);
    return result.rows;
  }

}