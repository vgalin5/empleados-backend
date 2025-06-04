import { pool } from '../config/db';
import { User } from '../models/User';

export class UserRepository {
  async create(user: User): Promise<void> {
    const { name, email, area, role } = user;
    await pool.query(
      'INSERT INTO users (name, email, area, role, status) VALUES ($1, $2, $3, $4, $5)',
      [name, email, area, role, 'pendiente']
    );
  }

  async findAll(): Promise<User[]> {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }
  async updateStatus(id: number, status: 'aprobado' | 'rechazado'): Promise<void> {
  await pool.query('UPDATE users SET status = $1 WHERE id = $2', [status, id]);
}
  async findById(id: number) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

}
