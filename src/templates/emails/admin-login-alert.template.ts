export interface LoginAlertEmailData {
  adminName: string;
  adminEmail: string;
  ip: string;
  userAgent: string;
  location?: string;
  timestamp: string;
}

export function getAdminLoginAlertEmailTemplate(data: LoginAlertEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security Alert: Admin Login Notification - Alpine Ace</title>
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
    .security-header {
      background-color: #0f172a;
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
    .security-title {
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }
    .body-content {
      padding: 32px;
    }
    .intro-text {
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 24px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      background-color: #f8fafc;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      margin-bottom: 24px;
    }
    .info-table tr {
      border-bottom: 1px solid #e2e8f0;
    }
    .info-table tr:last-child {
      border-bottom: none;
    }
    .info-label {
      padding: 14px 18px;
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      width: 35%;
      vertical-align: top;
      background-color: #f1f5f9;
    }
    .info-val {
      padding: 14px 18px;
      font-size: 13px;
      font-weight: 600;
      color: #0f172a;
      vertical-align: top;
      word-break: break-word;
    }
    .warning-box {
      background-color: #fef3c7;
      border-left: 4px solid #d97706;
      padding: 16px;
      border-radius: 8px;
      font-size: 13px;
      line-height: 1.5;
      color: #92400e;
      margin-bottom: 24px;
    }
    .footer {
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 20px 32px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main-card">
      <div class="security-header">
        <span class="badge">Security Notification</span>
        <h1 class="security-title">Admin Account Login Alert</h1>
      </div>
      <div class="body-content">
        <p class="intro-text">
          Hello <strong>${data.adminName}</strong>,<br>
          A new sign-in was detected for your Alpine Ace administrator account. Below are the details of the session:
        </p>
        
        <table class="info-table">
          <tr>
            <td class="info-label">Account Email</td>
            <td class="info-val">${data.adminEmail}</td>
          </tr>
          <tr>
            <td class="info-label">Login Time</td>
            <td class="info-val">${data.timestamp}</td>
          </tr>
          <tr>
            <td class="info-label">IP Address</td>
            <td class="info-val"><code>${data.ip}</code></td>
          </tr>
          <tr>
            <td class="info-label">Location (Approx.)</td>
            <td class="info-val">${data.location || 'Localhost / Private Network'}</td>
          </tr>
          <tr>
            <td class="info-label">Device &amp; User-Agent</td>
            <td class="info-val" style="font-size: 11px; color: #475569; font-family: monospace;">${data.userAgent}</td>
          </tr>
        </table>

        <div class="warning-box">
          <strong>Was this you?</strong> If you recently logged into the Alpine Ace admin portal, you can safely disregard this email. If this wasn't you, please change your password immediately and contact your system administrator.
        </div>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Alpine Ace Treks &amp; Expeditions. All security events are logged for audit compliance.
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
