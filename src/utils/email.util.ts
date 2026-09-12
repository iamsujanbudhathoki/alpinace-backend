import nodemailer from 'nodemailer';
import { DotenvConfig } from '../config/env.config';
import { getClientInquiryEmailTemplate } from '../templates/emails/client-inquiry.template';
import { getAdminInquiryEmailTemplate } from '../templates/emails/admin-inquiry.template';
import { getClientBookingEmailTemplate } from '../templates/emails/client-booking.template';
import { getAdminBookingEmailTemplate } from '../templates/emails/admin-booking.template';
import {
  getAdminLoginAlertEmailTemplate,
  LoginAlertEmailData,
} from '../templates/emails/admin-login-alert.template';
import { getAdminLockoutAlertEmailTemplate } from '../templates/emails/admin-lockout-alert.template';
import { getQuoteEmailTemplate } from '../templates/emails/quote.template';
import { getResetPasswordEmailTemplate } from '../templates/emails/auth-reset-password.template';
import { getOtpEmailTemplate } from '../templates/emails/auth-otp.template';

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

export interface BookingEmailData {
  reference: string;
  guestName: string;
  email: string;
  phone?: string;
  country?: string;
  packageName: string;
  packageType?: string;
  startDate?: string;
  endDate?: string;
  groupSize?: number;
  totalAmountUSD?: number;
  specialRequests?: string;
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

  async sendMail(to: string, mailType: MailType, extraData?: any): Promise<void> {
    if (!DotenvConfig.MAIL_USER || !DotenvConfig.MAIL_PASSWORD) return;
    const transporter = this.getTransporter();
    const { subject, body } = await this.getTemplate(to, mailType, extraData);
    await transporter.sendMail({
      from: `"Alpine Ace" <${DotenvConfig.MAIL_USER}>`,
      to,
      subject,
      text: body.replace(/<[^>]*>/g, ''),
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
      const clientHtml = await getClientInquiryEmailTemplate(data);

      // 2. Admin Notification Email
      const adminEmail = DotenvConfig.ADMIN_EMAIL || DotenvConfig.MAIL_USER || 'admin@alpineacetreks.com';
      const adminHtml = await getAdminInquiryEmailTemplate(data);

      // Dispatch Client Email
      await transporter.sendMail({
        from: `"Alpine Ace" <${DotenvConfig.MAIL_USER}>`,
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

  async sendBookingEmails(data: BookingEmailData): Promise<void> {
    if (!DotenvConfig.MAIL_USER || !DotenvConfig.MAIL_PASSWORD) {
      console.log('Skipping Nodemailer dispatch: MAIL_USER or MAIL_PASSWORD not configured in .env');
      return;
    }

    try {
      const transporter = this.getTransporter();

      // 1. Client Confirmation Email
      const clientHtml = await getClientBookingEmailTemplate(data);

      // 2. Admin Notification Email
      const adminEmail = DotenvConfig.ADMIN_EMAIL || DotenvConfig.MAIL_USER || 'admin@alpineacetreks.com';
      const adminHtml = await getAdminBookingEmailTemplate(data);

      // Dispatch Client Email
      await transporter.sendMail({
        from: `"Alpine Ace" <${DotenvConfig.MAIL_USER}>`,
        to: data.email,
        subject: `Booking Request Received [Ref: ${data.reference}] - Alpine Ace`,
        html: clientHtml,
      });

      // Dispatch Admin Email
      await transporter.sendMail({
        from: `"Alpine Ace Website" <${DotenvConfig.MAIL_USER}>`,
        to: adminEmail,
        subject: `[New Booking Request] ${data.reference} - ${data.guestName} (${data.packageName})`,
        html: adminHtml,
      });

      console.log(`[Nodemailer] Successfully sent booking confirmation email to client (${data.email}) and admin notification (${adminEmail}).`);
    } catch (error) {
      console.error('[Nodemailer] Error sending booking emails:', error);
    }
  }

  async sendQuoteEmail(data: { guestName: string; email: string; interestedTrip?: string; message: string }): Promise<void> {
    if (!DotenvConfig.MAIL_USER || !DotenvConfig.MAIL_PASSWORD) {
      console.log('Skipping quote email: MAIL_USER or MAIL_PASSWORD not configured in .env');
      return;
    }

    try {
      const transporter = this.getTransporter();
      const html = await getQuoteEmailTemplate(data);

      await transporter.sendMail({
        from: `"Alpine Ace" <${DotenvConfig.MAIL_USER}>`,
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
      const adminHtml = await getAdminLoginAlertEmailTemplate(data);
      const recipient = DotenvConfig.ADMIN_EMAIL || data.adminEmail || 'admin@alpineacetreks.com';

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

  async sendLockoutAlertEmail(data: { adminName: string; adminEmail: string; ip?: string }): Promise<void> {
    if (!DotenvConfig.MAIL_USER || !DotenvConfig.MAIL_PASSWORD) {
      console.log('Skipping lockout alert email: MAIL_USER or MAIL_PASSWORD not configured in .env');
      return;
    }

    try {
      const transporter = this.getTransporter();
      const recipient = DotenvConfig.ADMIN_EMAIL || DotenvConfig.MAIL_USER || data.adminEmail || 'admin@alpineacetreks.com';

      const html = await getAdminLockoutAlertEmailTemplate(data);

      await transporter.sendMail({
        from: `"Alpine Ace Security" <${DotenvConfig.MAIL_USER}>`,
        to: recipient,
        subject: `[SECURITY ALERT] Admin Account Locked Out - ${data.adminEmail}`,
        html,
      });

      console.log(`[Nodemailer] Admin lockout security alert email sent to ${recipient}`);
    } catch (error) {
      console.error('[Nodemailer] Error sending lockout alert email:', error);
    }
  }

  private async getTemplate(email: string, mailType: MailType, extraData?: any) {
    let subject = 'Alpine Ace Notification';
    let body = '';
    switch (mailType) {
      case MailType.RESET_PASSWORD: {
        const token = extraData?.token || 'abc';
        const resetLink = `${DotenvConfig.FRONTEND_BASE_URL}/reset-password?token=${token}`;
        subject = 'Reset Your Password - Alpine Ace';
        body = await getResetPasswordEmailTemplate({ email, resetLink });
        break;
      }
      case MailType.LOGIN_OTP: {
        const otp = extraData?.otp || '123456';
        subject = 'Your Verification Code - Alpine Ace';
        body = await getOtpEmailTemplate({ email, otp });
        break;
      }
    }
    return { subject, body };
  }
}

export default new EmailUtil();
