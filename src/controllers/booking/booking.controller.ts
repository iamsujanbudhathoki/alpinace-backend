import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Route,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { Booking } from '../../entities/booking/Booking.entity';
import { BookingService } from '../../services/booking/booking.service';
import {
  CreateBookingDto,
  UpdateBookingDto,
} from '../../schemas/booking.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('bookings')
@Tags('Bookings')
export class BookingController extends Controller {
  constructor(private bookingService: BookingService = new BookingService()) {
    super();
  }

  @Get('')
  async getAll(): Promise<ApiResponse<Booking[]>> {
    const data = await this.bookingService.getAll();
    return { data, message: 'Bookings retrieved successfully', success: true };
  }

  @Get('{id}')
  async getById(@Path() id: string): Promise<ApiResponse<Booking>> {
    const data = await this.bookingService.getById(id);
    return { data, message: 'Booking retrieved successfully', success: true };
  }

  @Post('')
  @Middlewares(RequestValidator.validate(CreateBookingDto))
  async create(@Body() body: CreateBookingDto): Promise<ApiResponse<Booking>> {
    const data = await this.bookingService.create(body);
    return { data, message: 'Booking created successfully', success: true };
  }

  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateBookingDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateBookingDto,
  ): Promise<ApiResponse<Booking>> {
    const data = await this.bookingService.update(id, body);
    return { data, message: 'Booking updated successfully', success: true };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.bookingService.delete(id);
    return { data, message: 'Booking deleted successfully', success: true };
  }
}
