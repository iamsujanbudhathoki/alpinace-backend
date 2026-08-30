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
import { Inquiry } from '../../entities/inquiry/Inquiry.entity';
import { InquiryService } from '../../services/inquiry/inquiry.service';
import { CreateInquiryDto } from '../../schemas/inquiry.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('inquiries')
@Tags('Public Inquiries')
export class InquiryController extends Controller {
  constructor(private inquiryService: InquiryService = new InquiryService()) {
    super();
  }

  /**
   * Public inquiry submission endpoint.
   */
  @Post('')
  @NoSecurity()
  @Middlewares(RequestValidator.validate(CreateInquiryDto))
  async create(@Body() body: CreateInquiryDto): Promise<ApiResponse<Inquiry>> {
    const data = await this.inquiryService.create(body);
    return { data, message: 'Inquiry submitted successfully', success: true };
  }
}
