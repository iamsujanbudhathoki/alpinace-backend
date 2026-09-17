import { renderEjsTemplate } from './template-renderer';
import { formatHumanDateTime } from '../../utils/date.util';

export interface LockoutAlertEmailData {
  adminName: string;
  adminEmail: string;
  ip?: string;
  timestamp?: string;
}

export async function getAdminLockoutAlertEmailTemplate(
  data: LockoutAlertEmailData,
): Promise<string> {
  const timestamp = formatHumanDateTime(data.timestamp);
  return renderEjsTemplate(
    'admin-lockout-alert',
    { ...data, timestamp },
    {
      title: '[SECURITY ALERT] Admin Account Locked Out',
      preheader: `Account lockout alert for ${data.adminEmail}.`,
      footerText: '&copy; Alpine Ace Security &bull; All administrative access events are logged.',
    },
  );
}
