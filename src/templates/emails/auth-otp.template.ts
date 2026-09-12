import { renderEjsTemplate } from './template-renderer';

export interface OtpEmailData {
  email: string;
  otp: string;
  expiresInMinutes?: number;
}

export async function getOtpEmailTemplate(data: OtpEmailData): Promise<string> {
  return renderEjsTemplate('auth-otp', data, {
    title: 'Verification Code - Alpine Ace',
    preheader: `Your verification code is ${data.otp}.`,
  });
}
