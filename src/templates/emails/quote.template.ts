import { renderBaseEmail, renderButton } from './base.template';

export interface QuoteEmailData {
  guestName: string;
  email: string;
  interestedTrip?: string;
  message: string;
}

export function getQuoteEmailTemplate(data: QuoteEmailData): string {
  const content = `
    <h1 style="font-size: 20px; font-weight: 700; color: #1c1917; margin: 0 0 16px 0;">
      Your Trip Proposal &amp; Quote
    </h1>

    <p style="font-size: 15px; font-weight: 600; color: #1c1917; margin: 0 0 12px 0;">
      Namaste ${data.guestName},
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #44403c; margin: 0 0 24px 0;">
      Thanks for getting in touch! Below are your custom trip details and pricing for <strong>${data.interestedTrip || 'your trek'}</strong>:
    </p>

    <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px; padding: 20px; margin: 24px 0; font-size: 14px; line-height: 1.65; color: #1c1917; white-space: pre-line;">
      ${data.message}
    </div>

    <p style="font-size: 14px; line-height: 1.6; color: #44403c; margin: 24px 0 16px 0;">
      If you want to adjust any dates, routes, or ask any questions, just reply to this email! We are happy to tailor everything to your needs.
    </p>

    ${renderButton(
      `mailto:admin@alpineacetreks.com?subject=RE:%20Trip%20Proposal%20-%20${encodeURIComponent(
        data.interestedTrip || 'Trek',
      )}`,
      'Reply to Our Team',
    )}
  `;

  return renderBaseEmail({
    title: `Custom Quote - ${data.interestedTrip || 'Alpine Ace Expedition'}`,
    preheader: `Your custom proposal for ${data.interestedTrip || 'Alpine Ace Expedition'} is ready.`,
    content,
  });
}
