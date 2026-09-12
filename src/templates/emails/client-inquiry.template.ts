import { InquiryEmailData } from '../../utils/email.util';
import { renderEjsTemplate } from './template-renderer';

export async function getClientInquiryEmailTemplate(data: InquiryEmailData): Promise<string> {
  return renderEjsTemplate('client-inquiry', data, {
    title: 'Inquiry Received - Alpine Ace',
    preheader: `Thank you for reaching out regarding ${data.interestedTrip || 'your trip'}.`,
  });
}
