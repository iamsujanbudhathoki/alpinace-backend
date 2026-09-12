import { renderEjsTemplate } from './template-renderer';

export interface QuoteEmailData {
  guestName: string;
  email: string;
  interestedTrip?: string;
  message: string;
}

export async function getQuoteEmailTemplate(data: QuoteEmailData): Promise<string> {
  return renderEjsTemplate('quote', data, {
    title: `Custom Quote - ${data.interestedTrip || 'Alpine Ace Expedition'}`,
    preheader: `Your custom proposal for ${data.interestedTrip || 'Alpine Ace Expedition'} is ready.`,
  });
}
