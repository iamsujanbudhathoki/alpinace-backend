import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  NoSecurity,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import {
  Booking,
  BookingPackageType,
  BookingPaymentStatus,
  BookingStatus,
} from '../../entities/booking/Booking.entity';
import { BookingService } from '../../services/booking/booking.service';
import {
  CreateBookingDto,
  UpdateBookingDto,
} from '../../schemas/booking.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('bookings')
@Tags('Bookings')
@Security('jwt', ['admin'])
export class BookingController extends Controller {
  constructor(private bookingService: BookingService = new BookingService()) {
    super();
  }

  @Get('')
  async getAll(
    @Query() search?: string,
    @Query() status?: BookingStatus,
    @Query() packageType?: BookingPackageType,
    @Query() paymentStatus?: BookingPaymentStatus,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<Booking[]>> {
    const dataTotalCount = await this.bookingService.getAll({
      search,
      status,
      packageType,
      paymentStatus,
      limit,
      page,
    });
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return { data, pagination, message: 'Bookings retrieved successfully', success: true };
  }

  @Get('{id}')
  async getById(@Path() id: string): Promise<ApiResponse<Booking>> {
    const data = await this.bookingService.getById(id);
    return { data, message: 'Booking retrieved successfully', success: true };
  }

  @Post('')
  @NoSecurity()
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
