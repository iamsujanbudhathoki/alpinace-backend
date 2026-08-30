import {
  Body,
  Controller,
  Middlewares,
  NoSecurity,
  Post,
  Route,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { Booking } from '../../entities/booking/Booking.entity';
import { BookingService } from '../../services/booking/booking.service';
import { CreateBookingDto } from '../../schemas/booking.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('bookings')
@Tags('Public Bookings')
export class BookingController extends Controller {
  constructor(private bookingService: BookingService = new BookingService()) {
    super();
  }

  /**
   * Public booking submission endpoint.
   */
  @Post('')
  @NoSecurity()
  @Middlewares(RequestValidator.validate(CreateBookingDto))
  async create(@Body() body: CreateBookingDto): Promise<ApiResponse<Booking>> {
    const data = await this.bookingService.create(body);
    return { data, message: 'Booking created successfully', success: true };
  }
}
