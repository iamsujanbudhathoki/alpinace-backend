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
import { Testimonial, TestimonialStatus } from '../../entities/testimonial/Testimonial.entity';
import { TestimonialService } from '../../services/testimonial/testimonial.service';
import { CreateTestimonialDto, UpdateTestimonialDto, ReorderTestimonialsDto } from '../../schemas/testimonial.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('testimonials')
@Tags('Testimonials & Reviews')
@Security('jwt', ['admin'])
export class TestimonialController extends Controller {
  constructor(private testimonialService: TestimonialService = new TestimonialService()) {
    super();
  }

  @Get('')
  @NoSecurity()
  async getAll(
    @Query() status?: TestimonialStatus,
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
    @Query() sortBy?: string,
    @Query() sortOrder?: 'ASC' | 'DESC' | 'asc' | 'desc',
  ): Promise<ApiResponse<Testimonial[]>> {
    const dataTotalCount = await this.testimonialService.getAll({
      status,
      search,
      limit,
      page,
      sortBy,
      sortOrder,
    });
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return { data, pagination, message: 'Testimonials retrieved successfully', success: true };
  }

  @Put('reorder')
  async reorder(@Body() body: ReorderTestimonialsDto): Promise<ApiResponse<boolean>> {
    const data = await this.testimonialService.reorder(body.items);
    return { data, message: 'Testimonials reordered successfully', success: true };
  }

  @Get('{id}')
  @NoSecurity()
  async getById(@Path() id: string): Promise<ApiResponse<Testimonial>> {
    const data = await this.testimonialService.getById(id);
    return { data, message: 'Testimonial retrieved successfully', success: true };
  }

  @Post('')
  @Middlewares(RequestValidator.validate(CreateTestimonialDto))
  async create(@Body() body: CreateTestimonialDto): Promise<ApiResponse<Testimonial>> {
    const data = await this.testimonialService.create(body);
    return { data, message: 'Testimonial created successfully', success: true };
  }

  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateTestimonialDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateTestimonialDto,
  ): Promise<ApiResponse<Testimonial>> {
    const data = await this.testimonialService.update(id, body);
    return { data, message: 'Testimonial updated successfully', success: true };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.testimonialService.delete(id);
    return { data, message: 'Testimonial deleted successfully', success: true };
  }
}
