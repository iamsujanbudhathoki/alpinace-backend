import nodemailer from 'nodemailer';
import { DotenvConfig } from '../config/env.config';
import { getClientInquiryEmailTemplate } from '../templates/emails/client-inquiry.template';
import { getAdminInquiryEmailTemplate } from '../templates/emails/admin-inquiry.template';
import {
  getAdminLoginAlertEmailTemplate,
  LoginAlertEmailData,
} from '../templates/emails/admin-login-alert.template';

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

  async sendQuoteEmail(data: { guestName: string; email: string; interestedTrip?: string; message: string }): Promise<void> {
    if (!DotenvConfig.MAIL_USER || !DotenvConfig.MAIL_PASSWORD) {
      console.log('Skipping quote email: MAIL_USER or MAIL_PASSWORD not configured in .env');
      return;
    }

    try {
      const transporter = this.getTransporter();
      const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #0f172a;">Custom Quote from Alpine Ace</h2>
          <p style="color: #475569;">Dear <strong>${data.guestName}</strong>,</p>
          <p style="color: #475569;">Thank you for your interest in <strong>${data.interestedTrip || 'our expeditions'}</strong>. Please find your custom quote below:</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 16px 0; white-space: pre-line; color: #1e293b; line-height: 1.7;">
            ${data.message}
          </div>
          <p style="color: #475569;">To confirm your booking or ask further questions, please reply to this email or contact us directly.</p>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 24px;">— Alpine Ace Treks &amp; Expeditions Team</p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Alpine Ace Concierge" <${DotenvConfig.MAIL_USER}>`,
        to: data.email,
        subject: `Your Custom Quote – ${data.interestedTrip || 'Alpine Ace Expedition'}`,
        html,
      });

      console.log(`[Nodemailer] Custom quote email dispatched to ${data.email}`);
    } catch (error) {
      console.error('[Nodemailer] Error sending quote email:', error);
      throw error;
    }
  }

  async sendLoginAlertEmail(data: LoginAlertEmailData): Promise<void> {
    if (!DotenvConfig.MAIL_USER || !DotenvConfig.MAIL_PASSWORD) {
      console.log('Skipping login alert email: MAIL_USER or MAIL_PASSWORD not configured in .env');
      return;
    }

    try {
      const transporter = this.getTransporter();
      const adminHtml = getAdminLoginAlertEmailTemplate(data);
      const recipient = DotenvConfig.ADMIN_EMAIL || data.adminEmail;

      await transporter.sendMail({
        from: `"Alpine Ace Security" <${DotenvConfig.MAIL_USER}>`,
        to: recipient,
        subject: `[Security Alert] Admin Login Detected - ${data.adminName} (${data.ip})`,
        html: adminHtml,
      });

      console.log(`[Nodemailer] Admin login security alert email sent to ${recipient} (IP: ${data.ip})`);
    } catch (error) {
      console.error('[Nodemailer] Error sending login alert email:', error);
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
