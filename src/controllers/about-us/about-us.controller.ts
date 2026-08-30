import { Controller, Get, NoSecurity, Route, Tags } from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { AboutUsService } from '../../services/about-us/about-us.service';
import { PublicAboutUsDto } from '../../dtos/public-response.dto';
import { toPublicAboutUs } from '../../utils/public-mapper.util';

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
  async getPublicContent(): Promise<ApiResponse<PublicAboutUsDto>> {
    const rawData = await this.aboutUsService.getPublic();
    const data = toPublicAboutUs(rawData);
    return {
      data,
      message: 'Public About Us content retrieved successfully',
      success: true,
    };
  }
}
