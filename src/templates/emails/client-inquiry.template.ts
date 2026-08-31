import { InquiryEmailData } from '../../utils/email.util';
import {
  renderBaseEmail,
  renderCallout,
  renderDataTable,
} from './base.template';

export function getClientInquiryEmailTemplate(data: InquiryEmailData): string {
  const content = `
    <h1 style="font-size: 20px; font-weight: 700; color: #1c1917; margin: 0 0 16px 0;">
      Inquiry Received
    </h1>
    
    <p style="font-size: 15px; font-weight: 600; color: #1c1917; margin: 0 0 12px 0;">
      Namaste ${data.guestName},
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #44403c; margin: 0 0 24px 0;">
      Thank you for reaching out to Alpine Ace! We have received your inquiry for <strong>${data.interestedTrip || 'your upcoming trip'}</strong>.
    </p>

    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #78716c; margin-bottom: 8px;">
      Your Inquiry Details
    </div>

    ${renderDataTable([
      { label: 'Trip', value: data.interestedTrip || 'Custom Trek' },
      { label: 'Travelers', value: `${data.groupSize || 1} ${data.groupSize === 1 ? 'person' : 'people'}` },
      { label: 'Dates', value: data.travelDates || 'Flexible' },
      { label: 'Note', value: data.message || 'None' },
    ])}

    ${renderCallout(
      'We are checking availability and route options for your trip. Someone from our team will email you back within 12 hours with recommendations.',
      'What Happens Next',
      'info',
    )}
  `;

  return renderBaseEmail({
    title: 'Inquiry Received - Alpine Ace',
    preheader: `Thank you for reaching out regarding ${data.interestedTrip || 'your trip'}.`,
    content,
  });
}
