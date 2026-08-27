import { Controller, Get, NoSecurity, Route, Tags } from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { AboutUs } from '../../entities/about-us/AboutUs.entity';
import { AboutUsService } from '../../services/about-us/about-us.service';

@Route('about-us')
@Tags('Public About Us')
export class AboutUsController extends Controller {
  constructor(private aboutUsService: AboutUsService = new AboutUsService()) {
    super();
  }

  /**
   * Get public About Us content and SEO metadata for the /about page.
   */
  @Get('')
  @NoSecurity()
  async getPublicContent(): Promise<ApiResponse<AboutUs>> {
    const data = await this.aboutUsService.getPublic();
    return {
      data,
      message: 'Public About Us content retrieved successfully',
      success: true,
    };
  }
}
