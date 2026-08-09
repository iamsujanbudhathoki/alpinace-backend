import nodemailer from 'nodemailer';
import { DotenvConfig } from '../config/env.config';
import { getClientInquiryEmailTemplate } from '../templates/emails/client-inquiry.template';
import { getAdminInquiryEmailTemplate } from '../templates/emails/admin-inquiry.template';

export enum MailType {
  RESET_PASSWORD = 'RESET_PASSWORD',
  LOGIN_OTP = 'LOGIN_OTP',
}

export interface InquiryEmailData {
  guestName: string;
  email: string;
  phone?: string;
  interestedTrip?: string;
  travelDates?: string;
  groupSize?: number;
  message?: string;
}

class EmailUtil {
  private getTransporter() {
    const port = Number(DotenvConfig.MAIL_PORT) || 465;
    return nodemailer.createTransport({
      host: DotenvConfig.MAIL_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465, // true for 465, false for 587 or other ports
      auth: {
        user: DotenvConfig.MAIL_USER,
        pass: DotenvConfig.MAIL_PASSWORD,
      },
    });
  }

  async sendMail(to: string, mailType: MailType) {
    if (!DotenvConfig.MAIL_USER || !DotenvConfig.MAIL_PASSWORD) return;
    const transporter = this.getTransporter();
    const { subject, body } = await this.getTemplate(to, mailType);
    await transporter.sendMail({
      from: `"Alpine Ace" <${DotenvConfig.MAIL_USER}>`,
      to,
      subject,
      text: body,
      html: body,
    });
  }

  async sendInquiryEmails(data: InquiryEmailData): Promise<void> {
    if (!DotenvConfig.MAIL_USER || !DotenvConfig.MAIL_PASSWORD) {
      console.log('Skipping Nodemailer dispatch: MAIL_USER or MAIL_PASSWORD not configured in .env');
      return;
    }

    try {
      const transporter = this.getTransporter();

      // 1. Client Confirmation Email
      const clientHtml = getClientInquiryEmailTemplate(data);

      // 2. Admin Notification Email
      const adminEmail = DotenvConfig.ADMIN_EMAIL || DotenvConfig.MAIL_USER;
      const adminHtml = getAdminInquiryEmailTemplate(data);

      // Dispatch Client Email
      await transporter.sendMail({
        from: `"Alpine Ace Concierge" <${DotenvConfig.MAIL_USER}>`,
        to: data.email,
        subject: `Inquiry Received - Alpine Ace Treks & Expeditions`,
        html: clientHtml,
      });

      // Dispatch Admin Email
      await transporter.sendMail({
        from: `"Alpine Ace Website" <${DotenvConfig.MAIL_USER}>`,
        to: adminEmail,
        subject: `[New Inquiry] ${data.guestName} - ${data.interestedTrip || 'General Inquiry'}`,
        html: adminHtml,
      });

      console.log(`[Nodemailer] Successfully sent confirmation email to client (${data.email}) and notification to admin (${adminEmail}).`);
    } catch (error) {
      console.error('[Nodemailer] Error sending inquiry emails:', error);
    }
  }

  private async getTemplate(email: string, mailType: MailType) {
    let subject = 'Alpine Ace Notification', body = '';
    switch (mailType) {
      case MailType.RESET_PASSWORD: {
        const token = 'abc';
        const link = `${DotenvConfig.FRONTEND_BASE_URL}/reset-password?token=${token}`;
        subject = 'Reset Password';
        body = `Your Reset Link is <b><a href="${link}">${link}</a></b>`;
        break;
      }
    }
    return { subject, body };
  }
}

export default new EmailUtil();
