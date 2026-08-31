import {
  renderBaseEmail,
  renderCallout,
  renderDataTable,
} from './base.template';

export interface LoginAlertEmailData {
  adminName: string;
  adminEmail: string;
  ip: string;
  userAgent: string;
  location?: string;
  timestamp: string;
}

export function getAdminLoginAlertEmailTemplate(
  data: LoginAlertEmailData,
): string {
  const content = `
    <h1 style="font-size: 20px; font-weight: 700; color: #1c1917; margin: 0 0 16px 0;">
      Security Alert: Admin Login
    </h1>

    <p style="font-size: 15px; font-weight: 600; color: #1c1917; margin: 0 0 12px 0;">
      Hello ${data.adminName},
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #44403c; margin: 0 0 24px 0;">
      A new sign-in was detected for your administrator account.
    </p>

    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #78716c; margin-bottom: 8px;">
      Session Details
    </div>

    ${renderDataTable([
      { label: 'Account Email', value: data.adminEmail },
      { label: 'Login Time', value: data.timestamp },
      { label: 'IP Address', value: data.ip, isCode: true },
      { label: 'Location', value: data.location || 'Localhost / Private Network' },
      { label: 'User Agent', value: data.userAgent },
    ])}

    ${renderCallout(
      'If you authorized this sign-in, no further action is required. If you did not authorize this access, please change your password immediately.',
      'Was this you?',
      'warning',
    )}
  `;

  return renderBaseEmail({
    title: 'Security Alert: Admin Login Notification',
    preheader: `Security alert for ${data.adminEmail} - Sign-in detected from ${data.ip}.`,
    content,
    footerText: '&copy; Alpine Ace Security &bull; All administrative access events are logged.',
  });
}
