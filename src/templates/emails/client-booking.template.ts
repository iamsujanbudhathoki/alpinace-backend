import { BookingEmailData } from '../../utils/email.util';
import {
  renderBaseEmail,
  renderCallout,
  renderDataTable,
} from './base.template';

export function getClientBookingEmailTemplate(data: BookingEmailData): string {
  const content = `
    <h1 style="font-size: 20px; font-weight: 700; color: #1c1917; margin: 0 0 16px 0;">
      Booking Request Received
    </h1>
    
    <p style="font-size: 15px; font-weight: 600; color: #1c1917; margin: 0 0 12px 0;">
      Namaste ${data.guestName},
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #44403c; margin: 0 0 24px 0;">
      Thank you for choosing Alpine Ace! We have received your booking request for <strong>${data.packageName}</strong>. Your booking reference code is <strong style="color: #92400e;">${data.reference}</strong>.
    </p>

    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #78716c; margin-bottom: 8px;">
      Booking Summary
    </div>

    ${renderDataTable([
      { label: 'Booking Reference', value: data.reference, isCode: true },
      { label: 'Trip Name', value: data.packageName },
      { label: 'Dates', value: `${data.startDate || 'TBD'} to ${data.endDate || 'TBD'}` },
      { label: 'Travelers', value: `${data.groupSize || 1} ${data.groupSize === 1 ? 'person' : 'people'}` },
      { label: 'Estimated Total', value: `$${(data.totalAmountUSD || 0).toLocaleString()} USD` },
      { label: 'Special Requests', value: data.specialRequests || 'None' },
    ])}

    ${renderCallout(
      'Our team is checking lodge rooms and permits for your dates. We will follow up with you within 12 hours to confirm your reservation details.',
      'What Happens Next',
      'info',
    )}
  `;

  return renderBaseEmail({
    title: `Booking Request Received - ${data.reference}`,
    preheader: `Thank you for booking ${data.packageName}. Reference Code: ${data.reference}`,
    content,
  });
}
