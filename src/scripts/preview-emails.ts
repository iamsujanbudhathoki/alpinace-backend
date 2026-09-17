import fs from 'fs';
import path from 'path';
import { getClientInquiryEmailTemplate } from '../templates/emails/client-inquiry.template';
import { getAdminInquiryEmailTemplate } from '../templates/emails/admin-inquiry.template';
import { getClientBookingEmailTemplate } from '../templates/emails/client-booking.template';
import { getAdminBookingEmailTemplate } from '../templates/emails/admin-booking.template';
import { getQuoteEmailTemplate } from '../templates/emails/quote.template';
import { getOtpEmailTemplate } from '../templates/emails/auth-otp.template';
import { getAdminLoginAlertEmailTemplate } from '../templates/emails/admin-login-alert.template';
import { getAdminLockoutAlertEmailTemplate } from '../templates/emails/admin-lockout-alert.template';

async function generatePreviews() {
  const outDir = path.resolve(process.cwd(), 'email-previews');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const templates: Record<string, Promise<string>> = {
    'client-inquiry.html': getClientInquiryEmailTemplate({
      guestName: 'Sophia Mueller',
      email: 'sophia.mueller@example.com',
      phone: '+49 170 1234567',
      interestedTrip: 'Everest Base Camp & Gokyo Lakes Trek',
      groupSize: 2,
      travelDates: 'October 12 - October 28, 2026',
      message: 'Hello! We are looking for an experienced Sherpa guide and private tea-house lodge bookings. Could you send route details and gear advice?',
    }),
    'admin-inquiry.html': getAdminInquiryEmailTemplate({
      guestName: 'Sophia Mueller',
      email: 'sophia.mueller@example.com',
      phone: '+49 170 1234567',
      interestedTrip: 'Everest Base Camp & Gokyo Lakes Trek',
      groupSize: 2,
      travelDates: 'October 12 - October 28, 2026',
      message: 'Hello! We are looking for an experienced Sherpa guide and private tea-house lodge bookings. Could you send route details and gear advice?',
    }),
    'client-booking.html': getClientBookingEmailTemplate({
      reference: 'AA-2026-8942',
      guestName: 'Alexander Hayes',
      email: 'alex.hayes@example.com',
      phone: '+1 (415) 890-1234',
      country: 'United States',
      packageName: 'Manaslu Circuit Expedition',
      startDate: 'Nov 02, 2026',
      endDate: 'Nov 18, 2026',
      groupSize: 2,
      totalAmountUSD: 3800,
      specialRequests: 'Vegetarian meals required on trek; airport pickup requested at KTM.',
    }),
    'admin-booking.html': getAdminBookingEmailTemplate({
      reference: 'AA-2026-8942',
      guestName: 'Alexander Hayes',
      email: 'alex.hayes@example.com',
      phone: '+1 (415) 890-1234',
      country: 'United States',
      packageName: 'Manaslu Circuit Expedition',
      startDate: 'Nov 02, 2026',
      endDate: 'Nov 18, 2026',
      groupSize: 2,
      totalAmountUSD: 3800,
      specialRequests: 'Vegetarian meals required on trek; airport pickup requested at KTM.',
    }),
    'quote.html': getQuoteEmailTemplate({
      guestName: 'Dr. Marcus Vance',
      email: 'm.vance@example.org',
      interestedTrip: 'Ama Dablam 6,812m Expedition',
      message: `Namaste Dr. Vance,

Thank you for contacting Alpine Ace. Based on your mountaineering background and schedule, here is our full-service expedition proposal:

1. Expedition Package: Ama Dablam 6,812m Guided Climb (28 Days)
2. Guide Ratio: 1:1 IFMGA Certified Lead Sherpa Guide
3. Logistics: Full Base Camp & Camp 1/2 tent setup, oxygen cylinders (2x), high-altitude chef, and domestic helicopter transfer Lukla/KTM.
4. Total Quote: $8,450 USD per climber (All permits and royalties included).

Please let us know if you'd like to schedule a 15-minute briefing call with our expedition director.`,
    }),
    'auth-otp.html': getOtpEmailTemplate({
      email: 'admin@alpineacetreks.com',
      otp: '482910',
      expiresInMinutes: 10,
    }),
    'admin-login-alert.html': getAdminLoginAlertEmailTemplate({
      adminName: 'Sujan Budhathoki',
      adminEmail: 'iamsujanbudhathoki@gmail.com',
      ip: '103.247.202.14',
      location: 'Kathmandu, Nepal',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36',
      timestamp: 'Sep 17, 2026 12:45:00 UTC',
    }),
    'admin-lockout-alert.html': getAdminLockoutAlertEmailTemplate({
      adminName: 'Lead Admin',
      adminEmail: 'admin@alpineacetreks.com',
      ip: '185.220.101.5',
      timestamp: 'Sep 17, 2026 12:50:15 UTC',
    }),
  };

  for (const [filename, promise] of Object.entries(templates)) {
    const html = await promise;
    fs.writeFileSync(path.join(outDir, filename), html, 'utf-8');
    console.log(`Generated: ${filename} (${html.length} bytes)`);
  }

  console.log(`\nAll 9 email template previews successfully generated in: ${outDir}`);
}

generatePreviews().catch((err) => {
  console.error('Error generating email previews:', err);
  process.exit(1);
});
