import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
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
} from '../../entities/booking/Booking.entity';
import { BookingService, BookingWorkflowPhase } from '../../services/booking/booking.service';
import { UpdateBookingDto, UpdateBookingWorkflowDto } from '../../schemas/booking.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('admin/bookings')
@Tags('Admin Bookings Management')
@Security('jwt', ['admin'])
export class AdminBookingController extends Controller {
  constructor(private bookingService: BookingService = new BookingService()) {
    super();
  }

  @Get('')
  async getAll(
    @Query() search?: string,
    @Query() status?: string,
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
    return { data, pagination, message: 'Admin bookings retrieved successfully', success: true };
  }

  @Get('workflow/phases')
  async getWorkflowPhases(): Promise<ApiResponse<BookingWorkflowPhase[]>> {
    const data = this.bookingService.getWorkflowPhases();
    return { data, message: 'Booking workflow phases retrieved successfully', success: true };
  }

  @Get('{id}')
  async getById(@Path() id: string): Promise<ApiResponse<Booking>> {
    const data = await this.bookingService.getById(id);
    return { data, message: 'Admin booking retrieved successfully', success: true };
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

  @Put('{id}/workflow')
  @Middlewares(RequestValidator.validate(UpdateBookingWorkflowDto))
  async updateWorkflow(
    @Path() id: string,
    @Body() body: UpdateBookingWorkflowDto,
  ): Promise<ApiResponse<Booking>> {
    const data = await this.bookingService.updateWorkflowStatus(id, body);
    return { data, message: 'Booking workflow steps updated successfully', success: true };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.bookingService.delete(id);
    return { data, message: 'Booking deleted successfully', success: true };
  }
}
