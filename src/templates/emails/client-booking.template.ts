import { BookingEmailData } from '../../utils/email.util';
import { renderEjsTemplate } from './template-renderer';

export async function getClientBookingEmailTemplate(data: BookingEmailData): Promise<string> {
  return renderEjsTemplate('client-booking', data, {
    title: `Booking Request Received - ${data.reference}`,
    preheader: `Thank you for booking ${data.packageName}. Reference Code: ${data.reference}`,
  });
}
