export interface AdminLoginResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  token: string;
}
