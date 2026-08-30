import {
  Controller,
  Get,
  NoSecurity,
  Path,
  Query,
  Route,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { FaqStatus } from '../../entities/faq/Faq.entity';
import { FaqService } from '../../services/faq/faq.service';
import { paginateResponse } from '../../utils/pageAndLimit';
import { PublicFaqDto } from '../../dtos/public-response.dto';
import { toPublicFaq } from '../../utils/public-mapper.util';

@Route('faqs')
@Tags('FAQs Public')
export class FaqController extends Controller {
  constructor(private faqService: FaqService = new FaqService()) {
    super();
  }

  /**
   * Get public active FAQs.
   * Enforces status = ACTIVE for public requests.
   */
  @Get('')
  @NoSecurity()
  async getAll(
    @Query() category?: string,
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
    @Query() sortBy?: string,
    @Query() sortOrder?: 'ASC' | 'DESC' | 'asc' | 'desc',
  ): Promise<ApiResponse<PublicFaqDto[]>> {
    const [items, totalCount] = await this.faqService.getAll({
      status: FaqStatus.ACTIVE,
      category,
      search,
      limit,
      page,
      sortBy,
      sortOrder,
    });
    const publicItems = items.map(toPublicFaq);
    const { data, pagination } = paginateResponse([publicItems, totalCount], limit, page);
    return { data, pagination, message: 'FAQs retrieved successfully', success: true };
  }

  /**
   * Get public active FAQ by ID.
   */
  @Get('{id}')
  @NoSecurity()
  async getById(@Path() id: string): Promise<ApiResponse<PublicFaqDto>> {
    const faq = await this.faqService.getById(id);
    const data = toPublicFaq(faq);
    return { data, message: 'FAQ retrieved successfully', success: true };
  }
}
