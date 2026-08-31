import { renderBaseEmail, renderButton, renderCallout } from './base.template';

export interface ResetPasswordEmailData {
  email: string;
  resetLink: string;
  userName?: string;
}

export function getResetPasswordEmailTemplate(
  data: ResetPasswordEmailData,
): string {
  const name = data.userName || 'there';

  const content = `
    <h1 style="font-size: 20px; font-weight: 700; color: #1c1917; margin: 0 0 16px 0;">
      Reset Your Password
    </h1>

    <p style="font-size: 15px; font-weight: 600; color: #1c1917; margin: 0 0 12px 0;">
      Hello ${name},
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #44403c; margin: 0 0 24px 0;">
      We received a request to reset the password for <strong>${data.email}</strong>. Click below to choose a new password:
    </p>

    ${renderButton(data.resetLink, 'Reset Password')}

    <p style="font-size: 13px; line-height: 1.6; color: #78716c; margin: 16px 0 24px 0;">
      If the button does not work, copy and paste this link into your browser:<br />
      <a href="${data.resetLink}" style="color: #92400e; text-decoration: none; word-break: break-all; font-weight: 500;">${data.resetLink}</a>
    </p>

    ${renderCallout(
      'If you did not ask to reset your password, you can ignore this email. Your account is safe.',
      'Security Note',
      'info',
    )}
  `;

  return renderBaseEmail({
    title: 'Reset Your Password - Alpine Ace',
    preheader: 'Password reset request for your Alpine Ace account.',
    content,
  });
}
