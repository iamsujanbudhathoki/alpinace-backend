import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Put,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { AboutUs } from '../../entities/about-us/AboutUs.entity';
import { AboutUsService } from '../../services/about-us/about-us.service';
import { UpdateAboutUsDto } from '../../schemas/about-us.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('admin/about-us')
@Tags('Admin About Us Management')
@Security('jwt', ['admin'])
export class AdminAboutUsController extends Controller {
  constructor(private aboutUsService: AboutUsService = new AboutUsService()) {
    super();
  }

  /**
   * Get complete editable About Us data including SEO metadata for admin panel.
   */
  @Get('')
  async getAdminContent(): Promise<ApiResponse<AboutUs>> {
    const data = await this.aboutUsService.get();
    return {
      data,
      message: 'Admin About Us content retrieved successfully',
      success: true,
    };
  }

  /**
   * Update or initialize About Us content and SEO metadata.
   */
  @Put('')
  @Middlewares(RequestValidator.validate(UpdateAboutUsDto))
  async update(
    @Body() body: UpdateAboutUsDto,
  ): Promise<ApiResponse<AboutUs>> {
    const data = await this.aboutUsService.update(body);
    return {
      data,
      message: 'About Us content updated successfully',
      success: true,
    };
  }

  /**
   * Create or initialize About Us content.
   */
  @Post('')
  @Middlewares(RequestValidator.validate(UpdateAboutUsDto))
  async create(
    @Body() body: UpdateAboutUsDto,
  ): Promise<ApiResponse<AboutUs>> {
    const data = await this.aboutUsService.update(body);
    return {
      data,
      message: 'About Us content initialized successfully',
      success: true,
    };
  }
}
