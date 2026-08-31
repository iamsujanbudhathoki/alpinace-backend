import { renderBaseEmail, renderCallout } from './base.template';

export interface OtpEmailData {
  email: string;
  otp: string;
  expiresInMinutes?: number;
}

export function getOtpEmailTemplate(data: OtpEmailData): string {
  const expiry = data.expiresInMinutes || 10;

  const content = `
    <h1 style="font-size: 20px; font-weight: 700; color: #1c1917; margin: 0 0 16px 0;">
      Your Verification Code
    </h1>

    <p style="font-size: 14px; line-height: 1.6; color: #44403c; margin: 0 0 20px 0;">
      Here is your verification code to log in:
    </p>

    <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
      <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #92400e; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
        ${data.otp}
      </span>
    </div>

    <p style="font-size: 13px; line-height: 1.6; color: #78716c; margin: 0 0 20px 0;">
      This code will expire in <strong>${expiry} minutes</strong>. Please keep it private.
    </p>

    ${renderCallout(
      'If you did not request a code, you can safely ignore this email.',
      'Security Note',
      'info',
    )}
  `;

  return renderBaseEmail({
    title: 'Verification Code - Alpine Ace',
    preheader: `Your verification code is ${data.otp}.`,
    content,
  });
}
