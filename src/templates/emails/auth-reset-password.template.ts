import { renderEjsTemplate } from './template-renderer';

export interface ResetPasswordEmailData {
  email: string;
  resetLink: string;
  userName?: string;
}

export async function getResetPasswordEmailTemplate(
  data: ResetPasswordEmailData,
): Promise<string> {
  return renderEjsTemplate('auth-reset-password', data, {
    title: 'Reset Your Password - Alpine Ace',
    preheader: 'Password reset request for your Alpine Ace account.',
  });
}
