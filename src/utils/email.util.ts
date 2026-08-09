import nodemailer from 'nodemailer';
import { DotenvConfig } from '../config/env.config';

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
      const clientHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #fafaf9; color: #18181b; margin: 0; padding: 24px 12px; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; overflow: hidden; }
            .banner { background-color: #09090b; padding: 32px 24px; text-align: center; color: #ffffff; }
            .content { padding: 32px 24px; }
            .pill { display: inline-block; background-color: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 99px; text-transform: uppercase; margin-bottom: 12px; }
            .box { background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 20px; margin: 20px 0; }
            .footer { background-color: #f5f5f4; padding: 20px; text-align: center; font-size: 12px; color: #78716c; border-top: 1px solid #e7e5e4; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="banner">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Alpine Ace</h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #a1a1aa;">Nepal Trekking &amp; Expeditions</p>
            </div>
            <div class="content">
              <span class="pill">Inquiry Received</span>
              <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 12px 0; color: #18181b;">Namaste, ${data.guestName}!</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #3f3f46; margin: 0 0 16px 0;">
                Thank you for reaching out to Alpine Ace. We have safely received your inquiry and assigned it to a Senior Destination Planner at our Kathmandu Headquarters.
              </p>
              
              <div class="box">
                <h3 style="font-size: 13px; font-weight: 700; margin: 0 0 12px 0; color: #18181b; border-bottom: 1px solid #e7e5e4; padding-bottom: 8px;">Inquiry Summary</h3>
                <p style="font-size: 13px; margin: 6px 0;"><strong>Region / Trip:</strong> ${data.interestedTrip || 'Custom Expedition'}</p>
                <p style="font-size: 13px; margin: 6px 0;"><strong>Travelers:</strong> ${data.groupSize || 1}</p>
                <p style="font-size: 13px; margin: 6px 0;"><strong>Dates:</strong> ${data.travelDates || 'Upcoming Season'}</p>
                <p style="font-size: 13px; margin: 6px 0;"><strong>Message:</strong> "${data.message || 'General Inquiry'}"</p>
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #3f3f46; margin: 0;">
                Our destination team is working on your itinerary details and will contact you directly within 24 hours.
              </p>
            </div>
            <div class="footer">
              <p style="margin: 0; font-weight: 600;">Alpine Ace Treks &amp; Expeditions Pvt. Ltd.</p>
              <p style="margin: 4px 0 0 0;">Tridevi Marg, Thamel, Kathmandu, Nepal &bull; +977 1 4410988</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // 2. Admin Notification Email
      const adminEmail = DotenvConfig.ADMIN_EMAIL || DotenvConfig.MAIL_USER;
      const adminHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #fafaf9; color: #18181b; margin: 0; padding: 24px 12px; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; overflow: hidden; }
            .banner { background-color: #78350f; padding: 24px; color: #ffffff; }
            .content { padding: 32px 24px; }
            .row { margin-bottom: 10px; font-size: 13px; border-bottom: 1px border #f5f5f4; padding-bottom: 6px; }
            .row strong { display: inline-block; width: 140px; color: #71717a; }
            .box { background-color: #fffbe6; border: 1px solid #ffe58f; border-radius: 8px; padding: 16px; margin-top: 16px; font-size: 13px; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="banner">
              <h2 style="margin: 0; font-size: 18px; font-weight: 700; color: #ffffff;">[New Web Inquiry] ${data.guestName}</h2>
            </div>
            <div class="content">
              <div class="row"><strong>Guest Name:</strong> <span>${data.guestName}</span></div>
              <div class="row"><strong>Email Address:</strong> <a href="mailto:${data.email}">${data.email}</a></div>
              <div class="row"><strong>Phone Number:</strong> <span>${data.phone || 'N/A'}</span></div>
              <div class="row"><strong>Interested Trip:</strong> <span>${data.interestedTrip || 'General Inquiry'}</span></div>
              <div class="row"><strong>Travelers Count:</strong> <span>${data.groupSize || 1}</span></div>
              <div class="row"><strong>Travel Dates:</strong> <span>${data.travelDates || 'Upcoming Season'}</span></div>
              
              <div class="box">
                <strong>Guest Message / Notes:</strong>
                <p style="margin: 6px 0 0 0; color: #18181b;">${data.message || 'No additional message provided.'}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

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
