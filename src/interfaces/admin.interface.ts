import { AdminRole } from '../entities/admin/Admin.entity';

export interface AdminLoginResponse {
  id: string;
  name: string;
  email: string;
  role: AdminRole ;
  avatarUrl?: string;
  token: string;
}
