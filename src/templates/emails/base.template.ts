export interface BaseEmailOptions {
  title: string;
  preheader?: string;
  content: string;
  footerText?: string;
  logoUrl?: string;
  websiteUrl?: string;
}

export interface DataTableRow {
  label: string;
  value: string;
  isCode?: boolean;
  isLink?: boolean;
  href?: string;
}

export function renderHeader(
  subtitle: string = 'Nepal Treks & Expeditions',
  logoUrl: string = 'https://alpineacetreks.com/logo.jpg',
  websiteUrl: string = 'https://alpineacetreks.com',
): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 1px solid #e5e5e5; background-color: #ffffff;">
      <tr>
        <td class="header-padding" style="padding: 22px 32px; text-align: left;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align: middle; padding-right: 12px;">
                <a href="${websiteUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                  <img src="${logoUrl}" alt="Alpine Ace Logo" width="38" height="38" style="display: block; width: 38px; height: 38px; max-width: 38px; border-radius: 6px; border: 1px solid #e5e5e5; object-fit: cover;" />
                </a>
              </td>
              <td style="vertical-align: middle;">
                <a href="${websiteUrl}" target="_blank" style="text-decoration: none; display: block;">
                  <div style="font-size: 18px; font-weight: 700; color: #0a0a0a; letter-spacing: -0.01em; line-height: 1.2; font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    Alpine Ace
                  </div>
                  ${
                    subtitle
                      ? `<div style="font-size: 11px; font-weight: 600; color: #737373; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${subtitle}</div>`
                      : ''
                  }
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

export function renderDataTable(rows: DataTableRow[]): string {
  if (!rows || rows.length === 0) return '';

  const validRows = rows.filter((r) => r && r.value !== undefined && r.value !== null && r.value !== '');
  if (validRows.length === 0) return '';

  const rowHtml = validRows
    .map((row) => {
      let valContent = row.value;
      if (row.isLink && row.href) {
        valContent = `<a href="${row.href}" target="_blank" style="color: #0a0a0a; text-decoration: underline; font-weight: 600;">${row.value}</a>`;
      } else if (row.isCode) {
        valContent = `<code style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; background-color: #f5f5f5; border: 1px solid #e5e5e5; padding: 2px 6px; border-radius: 4px; color: #0a0a0a; font-weight: 600;">${row.value}</code>`;
      }

      return `
        <tr>
          <td style="padding: 9px 12px 9px 0; font-size: 13px; font-weight: 600; color: #737373; border-bottom: 1px solid #f5f5f5; width: 140px; vertical-align: top; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            ${row.label}
          </td>
          <td style="padding: 9px 0; font-size: 14px; font-weight: 500; color: #0a0a0a; border-bottom: 1px solid #f5f5f5; vertical-align: top; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            ${valContent}
          </td>
        </tr>
      `;
    })
    .join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 14px 0 20px 0; border-collapse: collapse;">
      ${rowHtml}
    </table>
  `;
}

export function renderCallout(
  text: string,
  title?: string,
  type: 'info' | 'warning' | 'notice' | 'accent' = 'info',
): string {
  let bgColor = '#fafaf9';
  let boxBorder = '#e5e5e5';
  let accentBorder = '#eab308';
  let titleColor = '#0a0a0a';
  let textColor = '#404040';

  if (type === 'warning') {
    bgColor = '#fff1f2';
    boxBorder = '#fecdd3';
    accentBorder = '#e11d48';
    titleColor = '#9f1239';
    textColor = '#881337';
  } else if (type === 'notice' || type === 'accent') {
    bgColor = '#fefce8';
    boxBorder = '#fef08a';
    accentBorder = '#eab308';
    titleColor = '#854d0e';
    textColor = '#713f12';
  } else if (type === 'info') {
    bgColor = '#fafaf9';
    boxBorder = '#e5e5e5';
    accentBorder = '#eab308';
    titleColor = '#0a0a0a';
    textColor = '#404040';
  }

  return `
    <div style="background-color: ${bgColor}; border: 1px solid ${boxBorder}; border-left: 3px solid ${accentBorder}; padding: 14px 18px; border-radius: 6px; margin: 20px 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      ${
        title
          ? `<div style="font-size: 13px; font-weight: 600; color: ${titleColor}; margin-bottom: 4px; font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${title}</div>`
          : ''
      }
      <div style="font-size: 13px; line-height: 1.55; color: ${textColor}; font-weight: 400;">
        ${text}
      </div>
    </div>
  `;
}

export function renderButton(url: string, label: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 22px 0;">
      <tr>
        <td align="left">
          <a href="${url}" target="_blank" style="background-color: #0a0a0a; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 11px 22px; border-radius: 6px; display: inline-block; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; letter-spacing: -0.01em; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);">
            ${label}
          </a>
        </td>
      </tr>
    </table>
  `;
}

export function renderBaseEmail(options: BaseEmailOptions): string {
  const currentYear = new Date().getFullYear();
  const websiteUrl = options.websiteUrl || 'https://alpineacetreks.com';
  const siteHost = websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const logoUrl = options.logoUrl || `${websiteUrl}/logo.jpg`;

  const footerLegal = options.footerText
    ? options.footerText
    : `&copy; ${currentYear} Alpine Ace. All rights reserved.`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${options.title}</title>
  ${
    options.preheader
      ? `<div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #ffffff; opacity: 0; mso-hide: all;">${options.preheader}</div>`
      : ''
  }
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #fafaf9; color: #0a0a0a; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: auto !important; border-radius: 0 !important; border-left: none !important; border-right: none !important; }
      .content-padding { padding: 24px 20px !important; }
      .header-padding { padding: 20px 20px !important; }
      .footer-padding { padding: 22px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #fafaf9; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafaf9; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <!--[if mso]>
        <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="580">
        <tr>
        <td>
        <![endif]-->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e5e5e5; border-top: 3px solid #eab308; border-radius: 8px; overflow: hidden; margin: 0 auto; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);">
          <!-- Header -->
          <tr>
            <td>
              ${renderHeader('Nepal Treks & Expeditions', logoUrl, websiteUrl)}
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td class="content-padding" style="padding: 32px 32px 28px 32px;">
              ${options.content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td class="footer-padding" style="padding: 22px 32px; background-color: #fafaf9; border-top: 1px solid #e5e5e5; text-align: left;">
              <p style="margin: 0 0 6px 0; font-size: 12px; line-height: 1.5; font-weight: 600; color: #0a0a0a; font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Alpine Ace Treks &amp; Expeditions Pvt. Ltd.
              </p>
              <p style="margin: 0 0 8px 0; font-size: 11px; line-height: 1.5; color: #737373; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Tridevi Marg, Thamel, Kathmandu, Nepal &bull; <a href="mailto:info@alpineacetreks.com" style="color: #404040; text-decoration: underline;">info@alpineacetreks.com</a> &bull; <a href="${websiteUrl}" target="_blank" style="color: #404040; text-decoration: underline;">${siteHost}</a>
              </p>
              <p style="margin: 0; font-size: 11px; line-height: 1.5; color: #a3a3a3; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                ${footerLegal}
              </p>
            </td>
          </tr>
        </table>
        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
