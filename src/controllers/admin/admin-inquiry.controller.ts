import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { Inquiry, InquiryStatus } from '../../entities/inquiry/Inquiry.entity';
import { InquiryService } from '../../services/inquiry/inquiry.service';
import {
  UpdateInquiryDto,
  SendQuoteDto,
} from '../../schemas/inquiry.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('admin/inquiries')
@Tags('Admin Inquiries Management')
@Security('jwt', ['admin'])
export class AdminInquiryController extends Controller {
  constructor(private inquiryService: InquiryService = new InquiryService()) {
    super();
  }

  @Get('')
  async getAll(
    @Query() status?: InquiryStatus,
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<Inquiry[]>> {
    const dataTotalCount = await this.inquiryService.getAll({
      status,
      search,
      limit,
      page,
    });
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return { data, pagination, message: 'Admin inquiries retrieved successfully', success: true };
  }

  @Get('{id}')
  async getById(@Path() id: string): Promise<ApiResponse<Inquiry>> {
    const data = await this.inquiryService.getById(id);
    return { data, message: 'Admin inquiry retrieved successfully', success: true };
  }

  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateInquiryDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateInquiryDto,
  ): Promise<ApiResponse<Inquiry>> {
    const data = await this.inquiryService.update(id, body);
    return { data, message: 'Inquiry updated successfully', success: true };
  }

  @Post('{id}/quote')
  @Middlewares(RequestValidator.validate(SendQuoteDto))
  async sendQuote(
    @Path() id: string,
    @Body() body: SendQuoteDto & { status?: InquiryStatus },
  ): Promise<ApiResponse<Inquiry>> {
    const data = await this.inquiryService.sendQuote(id, {
      message: body.message,
      status: body.status,
    });
    return {
      data,
      message: 'Custom quote email dispatched successfully',
      success: true,
    };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.inquiryService.delete(id);
    return { data, message: 'Inquiry deleted successfully', success: true };
  }
}
