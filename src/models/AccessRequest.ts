export interface AccessRequest {
  id?: number;
  user_id: number;
  access_type: string;
  status?: 'pendiente' | 'aprobado' | 'rechazado';
  requested_at?: Date;
}