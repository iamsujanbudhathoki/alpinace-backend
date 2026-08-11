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
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { Faq, FaqStatus } from '../../entities/faq/Faq.entity';
import { FaqService } from '../../services/faq/faq.service';
import { CreateFaqDto, UpdateFaqDto } from '../../schemas/faq.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('faqs')
@Tags('FAQs & Consultations')
export class FaqController extends Controller {
  constructor(private faqService: FaqService = new FaqService()) {
    super();
  }

  @Get('')
  async getAll(@Query() status?: FaqStatus): Promise<ApiResponse<Faq[]>> {
    const data = await this.faqService.getAll(status);
    return { data, message: 'FAQs retrieved successfully', success: true };
  }

  @Get('{id}')
  async getById(@Path() id: string): Promise<ApiResponse<Faq>> {
    const data = await this.faqService.getById(id);
    return { data, message: 'FAQ retrieved successfully', success: true };
  }

  @Post('')
  @Middlewares(RequestValidator.validate(CreateFaqDto))
  async create(@Body() body: CreateFaqDto): Promise<ApiResponse<Faq>> {
    const data = await this.faqService.create(body);
    return { data, message: 'FAQ created successfully', success: true };
  }

  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateFaqDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateFaqDto,
  ): Promise<ApiResponse<Faq>> {
    const data = await this.faqService.update(id, body);
    return { data, message: 'FAQ updated successfully', success: true };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.faqService.delete(id);
    return { data, message: 'FAQ deleted successfully', success: true };
  }
}
