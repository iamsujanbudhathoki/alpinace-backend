import { InquiryEmailData } from '../../utils/email.util';

export function getClientInquiryEmailTemplate(data: InquiryEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Confirmation - Alpine Ace</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #fafaf9;
      color: #27272a;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #fafaf9;
      padding: 40px 16px;
    }
    .main-card {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e7e5e4;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    }
    .brand-header {
      background-color: #09090b;
      padding: 36px 32px;
      text-align: center;
      border-bottom: 3px solid #d97706;
    }
    .brand-title {
      color: #ffffff;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 0;
    }
    .brand-subtitle {
      color: #fbbf24;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin: 6px 0 0 0;
    }
    .body-content {
      padding: 36px 32px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 700;
      color: #09090b;
      margin: 0 0 16px 0;
    }
    .paragraph {
      font-size: 14px;
      line-height: 1.65;
      color: #52525b;
      margin: 0 0 24px 0;
    }
    .summary-card {
      background-color: #fafaf9;
      border: 1px solid #e7e5e4;
      border-radius: 14px;
      padding: 24px;
      margin-bottom: 28px;
    }
    .summary-title {
      font-size: 13px;
      font-weight: 700;
      color: #78350f;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin: 0 0 16px 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #e7e5e4;
    }
    .data-row {
      display: flex;
      margin-bottom: 12px;
      font-size: 13px;
    }
    .data-label {
      width: 140px;
      font-weight: 600;
      color: #71717a;
      flex-shrink: 0;
    }
    .data-value {
      color: #18181b;
      font-weight: 500;
    }
    .highlight-box {
      background-color: #fffbeb;
      border: 1px solid #fef3c7;
      border-radius: 12px;
      padding: 16px 20px;
      font-size: 13px;
      color: #92400e;
      line-height: 1.5;
    }
    .footer {
      background-color: #f5f5f4;
      padding: 24px 32px;
      text-align: center;
      font-size: 12px;
      color: #78716c;
      border-top: 1px solid #e7e5e4;
      line-height: 1.6;
    }
    .footer strong {
      color: #18181b;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main-card">
      <div class="brand-header">
        <h1 class="brand-title">ALPINE ACE</h1>
        <p class="brand-subtitle">Nepal Trekking &amp; Expeditions</p>
      </div>

      <div class="body-content">
        <h2 class="greeting">Namaste, ${data.guestName}!</h2>
        <p class="paragraph">
          Thank you for choosing Alpine Ace. We have safely received your trip inquiry and assigned it to a Senior Destination Specialist at our Kathmandu Headquarters.
        </p>

        <div class="summary-card">
          <div class="summary-title">Inquiry Details</div>
          
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #71717a; font-weight: 600; width: 140px;">Region / Trip:</td>
              <td style="padding: 6px 0; color: #18181b; font-weight: 600;">${data.interestedTrip || 'Custom Expedition'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #71717a; font-weight: 600;">Travelers Count:</td>
              <td style="padding: 6px 0; color: #18181b;">${data.groupSize || 1} Traveler(s)</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #71717a; font-weight: 600;">Target Season:</td>
              <td style="padding: 6px 0; color: #18181b;">${data.travelDates || 'Upcoming Season'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #71717a; font-weight: 600; vertical-align: top;">Your Message:</td>
              <td style="padding: 6px 0; color: #18181b; line-height: 1.5;">${data.message || 'General inquiry submitted via website form.'}</td>
            </tr>
          </table>
        </div>

        <div class="highlight-box">
          <strong>What Happens Next?</strong><br />
          Our team in Kathmandu is preparing custom route recommendations and lodge options. A destination specialist will contact you directly within 24 hours.
        </div>
      </div>

      <div class="footer">
        <p style="margin: 0 0 4px 0;"><strong>Alpine Ace Treks &amp; Expeditions Pvt. Ltd.</strong></p>
        <p style="margin: 0 0 4px 0;">Tridevi Marg, Thamel, Kathmandu, Nepal (44600)</p>
        <p style="margin: 0;">Direct Desk: +977 1 4410988 | Email: concierge@alpineacetreks.com</p>
      </div>

    </div>
  </div>
</body>
</html>
  `;
}
