export interface BaseEmailOptions {
  title: string;
  preheader?: string;
  content: string;
  footerText?: string;
}

export interface DataTableRow {
  label: string;
  value: string;
  isCode?: boolean;
  isLink?: boolean;
  href?: string;
}

export function renderHeader(subtitle: string = 'Nepal Treks & Expeditions'): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 1px solid #f5f5f4;">
      <tr>
        <td style="padding: 24px 32px; text-align: left;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align: middle;">
                <div style="font-size: 20px; font-weight: 700; color: #1c1917; letter-spacing: -0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                  Alpine Ace
                </div>
                ${
                  subtitle
                    ? `<div style="font-size: 12px; font-weight: 500; color: #78716c; margin-top: 2px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${subtitle}</div>`
                    : ''
                }
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
        valContent = `<a href="${row.href}" style="color: #92400e; text-decoration: none; font-weight: 600;">${row.value}</a>`;
      } else if (row.isCode) {
        valContent = `<code style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; background-color: #f5f5f4; border: 1px solid #e7e5e4; padding: 2px 6px; border-radius: 4px; color: #1c1917;">${row.value}</code>`;
      }

      return `
        <tr>
          <td style="padding: 10px 12px 10px 0; font-size: 13px; font-weight: 600; color: #78716c; border-bottom: 1px solid #f5f5f4; width: 140px; vertical-align: top; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${row.label}
          </td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: 500; color: #1c1917; border-bottom: 1px solid #f5f5f4; vertical-align: top; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${valContent}
          </td>
        </tr>
      `;
    })
    .join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 16px 0; border-collapse: collapse;">
      ${rowHtml}
    </table>
  `;
}

export function renderCallout(
  text: string,
  title?: string,
  type: 'info' | 'warning' | 'accent' = 'info',
): string {
  let bgColor = '#fafaf9';
  let borderColor = '#d6d3d1';
  let titleColor = '#1c1917';
  let textColor = '#44403c';

  if (type === 'warning') {
    bgColor = '#fffbe6';
    borderColor = '#b45309';
    titleColor = '#78350f';
    textColor = '#92400e';
  } else if (type === 'accent' || type === 'info') {
    bgColor = '#fefce8';
    borderColor = '#b45309';
    titleColor = '#78350f';
    textColor = '#451a03';
  }

  return `
    <div style="background-color: ${bgColor}; border-left: 3px solid ${borderColor}; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      ${
        title
          ? `<div style="font-size: 14px; font-weight: 700; color: ${titleColor}; margin-bottom: 4px;">${title}</div>`
          : ''
      }
      <div style="font-size: 14px; line-height: 1.6; color: ${textColor}; font-weight: 400;">
        ${text}
      </div>
    </div>
  `;
}

export function renderButton(url: string, label: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0;">
      <tr>
        <td align="left">
          <a href="${url}" style="background-color: #92400e; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 26px; border-radius: 8px; display: inline-block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            ${label}
          </a>
        </td>
      </tr>
    </table>
  `;
}

export function renderBaseEmail(options: BaseEmailOptions): string {
  const currentYear = new Date().getFullYear();
  const defaultFooter = `&copy; ${currentYear} Alpine Ace Treks &amp; Expeditions Pvt. Ltd.<br />Tridevi Marg, Thamel, Kathmandu, Nepal &bull; info@alpineacetreks.com`;
  const footerContent = options.footerText || defaultFooter;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${options.title}</title>
  ${
    options.preheader
      ? `<div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">${options.preheader}</div>`
      : ''
  }
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #fafaf9; color: #44403c; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: auto !important; border-radius: 0 !important; border: none !important; }
      .content-padding { padding: 24px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #fafaf9;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafaf9; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 36px 16px;">
        <!--[if mso]>
        <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="580">
        <tr>
        <td>
        <![endif]-->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e7e5e4; border-top: 4px solid #92400e; border-radius: 12px; overflow: hidden; margin: 0 auto; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <!-- Header -->
          <tr>
            <td>
              ${renderHeader()}
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td class="content-padding" style="padding: 32px;">
              ${options.content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #fafaf9; border-top: 1px solid #f5f5f4; text-align: left;">
              <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #78716c; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                ${footerContent}
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
