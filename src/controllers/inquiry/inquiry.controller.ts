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
import { Inquiry } from '../../entities/inquiry/Inquiry.entity';
import { InquiryService } from '../../services/inquiry/inquiry.service';
import {
  CreateInquiryDto,
  UpdateInquiryDto,
  SendQuoteDto,
} from '../../schemas/inquiry.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('inquiries')
@Tags('Inquiries & Leads')
export class InquiryController extends Controller {
  constructor(private inquiryService: InquiryService = new InquiryService()) {
    super();
  }

  @Get('')
  async getAll(): Promise<ApiResponse<Inquiry[]>> {
    const data = await this.inquiryService.getAll();
    return { data, message: 'Inquiries retrieved successfully', success: true };
  }

  @Get('{id}')
  async getById(@Path() id: string): Promise<ApiResponse<Inquiry>> {
    const data = await this.inquiryService.getById(id);
    return { data, message: 'Inquiry retrieved successfully', success: true };
  }

  @Post('')
  @Middlewares(RequestValidator.validate(CreateInquiryDto))
  async create(@Body() body: CreateInquiryDto): Promise<ApiResponse<Inquiry>> {
    const data = await this.inquiryService.create(body);
    return { data, message: 'Inquiry submitted successfully', success: true };
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
    @Body() body: SendQuoteDto & { status?: string },
  ): Promise<ApiResponse<Inquiry>> {
    const data = await this.inquiryService.sendQuote(id, { message: body.message, status: body.status });
    return { data, message: 'Custom quote email dispatched successfully', success: true };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.inquiryService.delete(id);
    return { data, message: 'Inquiry deleted successfully', success: true };
  }
}
