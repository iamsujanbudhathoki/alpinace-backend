import { renderEjsTemplate } from './template-renderer';

export interface LoginAlertEmailData {
  adminName: string;
  adminEmail: string;
  ip: string;
  userAgent: string;
  location?: string;
  timestamp: string;
}

export async function getAdminLoginAlertEmailTemplate(
  data: LoginAlertEmailData,
): Promise<string> {
  return renderEjsTemplate('admin-login-alert', data, {
    title: 'Security Alert: Admin Login Notification',
    preheader: `Security alert for ${data.adminEmail} - Sign-in detected from ${data.ip}.`,
    footerText: '&copy; Alpine Ace Security &bull; All administrative access events are logged.',
  });
}
