import { InquiryEmailData } from '../../utils/email.util';
import { renderEjsTemplate } from './template-renderer';

export async function getAdminInquiryEmailTemplate(data: InquiryEmailData): Promise<string> {
  return renderEjsTemplate('admin-inquiry', data, {
    title: `[New Inquiry] ${data.guestName}`,
    preheader: `New inquiry from ${data.guestName} for ${data.interestedTrip || 'our expeditions'}.`,
    footerText: 'Alpine Ace Internal Notification &bull; Generated automatically by backend server.',
  });
}
