import { BookingEmailData } from '../../utils/email.util';
import {
  renderBaseEmail,
  renderButton,
  renderDataTable,
} from './base.template';

export function getAdminBookingEmailTemplate(data: BookingEmailData): string {
  const content = `
    <h1 style="font-size: 20px; font-weight: 700; color: #1c1917; margin: 0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      New Booking Request
    </h1>

    <p style="font-size: 14px; line-height: 1.6; color: #44403c; margin: 0 0 20px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      A new trip booking request has been submitted through the website.
    </p>

    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #78716c; margin-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      Booking &amp; Traveler Details
    </div>

    ${renderDataTable([
      { label: 'Booking Reference', value: data.reference, isCode: true },
      { label: 'Guest Name', value: data.guestName },
      {
        label: 'Email Address',
        value: data.email,
        isLink: true,
        href: `mailto:${data.email}`,
      },
      { label: 'Phone / WhatsApp', value: data.phone || 'Not provided' },
      { label: 'Country', value: data.country || 'N/A' },
      { label: 'Package Name', value: data.packageName },
      { label: 'Departure & Return', value: `${data.startDate || 'TBD'} to ${data.endDate || 'TBD'}` },
      { label: 'Group Size', value: `${data.groupSize || 1} Traveler(s)` },
      { label: 'Total Amount', value: `$${(data.totalAmountUSD || 0).toLocaleString()} USD` },
      { label: 'Special Requests', value: data.specialRequests || 'None' },
    ])}

    ${renderButton(
      `mailto:${data.email}?subject=RE:%20Alpine%20Ace%20Booking%20${data.reference}%20-%20${encodeURIComponent(
        data.packageName,
      )}`,
      `Reply to ${data.guestName}`,
    )}
  `;

  return renderBaseEmail({
    title: `[New Booking] ${data.reference} - ${data.guestName}`,
    preheader: `New booking request from ${data.guestName} for ${data.packageName}.`,
    content,
    footerText: 'Alpine Ace Internal Notification &bull; Generated automatically by backend server.',
  });
}
