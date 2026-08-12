import { InquiryEmailData } from '../../utils/email.util';

export function getAdminInquiryEmailTemplate(data: InquiryEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Notification - Alpine Ace</title>
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
    .admin-header {
      background-color: #18181b;
      padding: 28px 32px;
      border-bottom: 3px solid #d97706;
    }
    .badge {
      display: inline-block;
      background-color: #d97706;
      color: #ffffff;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 3px 10px;
      border-radius: 6px;
      margin-bottom: 8px;
    }
    .admin-title {
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }
    .body-content {
      padding: 32px;
    }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      color: #71717a;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin: 0 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 1px solid #e7e5e4;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      margin-bottom: 24px;
    }
    .data-table td {
      padding: 8px 0;
      border-bottom: 1px solid #f5f5f4;
    }
    .data-table td.label {
      width: 150px;
      font-weight: 600;
      color: #71717a;
    }
    .data-table td.value {
      color: #09090b;
      font-weight: 600;
    }
    .message-card {
      background-color: #fffbeb;
      border: 1px solid #fef3c7;
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 28px;
    }
    .message-title {
      font-size: 12px;
      font-weight: 700;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 8px 0;
    }
    .message-text {
      font-size: 13px;
      line-height: 1.6;
      color: #78350f;
      margin: 0;
    }
    .btn-container {
      text-align: center;
      padding-top: 8px;
    }
    .btn-reply {
      display: inline-block;
      background-color: #18181b;
      color: #ffffff;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 12px;
    }
    .footer {
      background-color: #f5f5f4;
      padding: 20px 32px;
      text-align: center;
      font-size: 11px;
      color: #a1a1aa;
      border-top: 1px solid #e7e5e4;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main-card">
      <div class="admin-header">
        <span class="badge">New Website Inquiry</span>
        <h1 class="admin-title">${data.guestName} &mdash; ${data.interestedTrip || 'General Trip'}</h1>
      </div>

      <div class="body-content">
        <div class="section-title">Guest Profile &amp; Contact Details</div>
        
        <table class="data-table">
          <tr>
            <td class="label">Guest Full Name:</td>
            <td class="value">${data.guestName}</td>
          </tr>
          <tr>
            <td class="label">Email Address:</td>
            <td class="value"><a href="mailto:${data.email}" style="color: #d97706; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone / WhatsApp:</td>
            <td class="value">${data.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td class="label">Region of Interest:</td>
            <td class="value">${data.interestedTrip || 'Custom Wilderness'}</td>
          </tr>
          <tr>
            <td class="label">Group Size:</td>
            <td class="value">${data.groupSize || 1} Traveler(s)</td>
          </tr>
          <tr>
            <td class="label">Tentative Dates:</td>
            <td class="value">${data.travelDates || 'Upcoming Season'}</td>
          </tr>
        </table>

        <div class="message-card">
          <div class="message-title">Guest Requirements &amp; Message</div>
          <p class="message-text">"${data.message || 'No additional details provided.'}"</p>
        </div>

        <div class="btn-container">
          <a href="mailto:${data.email}?subject=RE:%20Alpine%20Ace%20Expedition%20Inquiry" class="btn-reply">
            Reply to ${data.guestName} &rarr;
          </a>
        </div>
      </div>

      <div class="footer">
        Alpine Ace Admin Notification &bull; Generated automatically by backend server.
      </div>

    </div>
  </div>
</body>
</html>
  `;
}
