import { BookingEmailData } from '../../utils/email.util';
import { renderEjsTemplate } from './template-renderer';

export async function getAdminBookingEmailTemplate(data: BookingEmailData): Promise<string> {
  return renderEjsTemplate('admin-booking', data, {
    title: `[New Booking] ${data.reference} - ${data.guestName}`,
    preheader: `New booking request from ${data.guestName} for ${data.packageName}.`,
    footerText: 'Alpine Ace Internal Notification &bull; Generated automatically by backend server.',
  });
}
