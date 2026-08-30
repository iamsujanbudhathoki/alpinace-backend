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
import { TestimonialStatus } from '../../entities/testimonial/Testimonial.entity';
import { TestimonialService } from '../../services/testimonial/testimonial.service';
import { paginateResponse } from '../../utils/pageAndLimit';
import { PublicTestimonialDto } from '../../dtos/public-response.dto';
import { toPublicTestimonial } from '../../utils/public-mapper.util';

@Route('testimonials')
@Tags('Testimonials Public')
export class TestimonialController extends Controller {
  constructor(private testimonialService: TestimonialService = new TestimonialService()) {
    super();
  }

  /**
   * Get public active testimonials.
   * Enforces status = ACTIVE for public requests.
   */
  @Get('')
  @NoSecurity()
  async getAll(
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
    @Query() sortBy?: string,
    @Query() sortOrder?: 'ASC' | 'DESC' | 'asc' | 'desc',
  ): Promise<ApiResponse<PublicTestimonialDto[]>> {
    const [items, totalCount] = await this.testimonialService.getAll({
      status: TestimonialStatus.ACTIVE,
      search,
      limit,
      page,
      sortBy,
      sortOrder,
    });
    const publicItems = items.map(toPublicTestimonial);
    const { data, pagination } = paginateResponse([publicItems, totalCount], limit, page);
    return { data, pagination, message: 'Testimonials retrieved successfully', success: true };
  }

  /**
   * Get public active testimonial by ID.
   */
  @Get('{id}')
  @NoSecurity()
  async getById(@Path() id: string): Promise<ApiResponse<PublicTestimonialDto>> {
    const item = await this.testimonialService.getById(id);
    const data = toPublicTestimonial(item);
    return { data, message: 'Testimonial retrieved successfully', success: true };
  }
}
