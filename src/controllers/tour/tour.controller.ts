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
import { TourStatus, TourType } from '../../entities/tour/Tour.entity';
import { TripDifficulty } from '../../entities/common/difficulty.enum';
import { TourService } from '../../services/tour/tour.service';
import { paginateResponse } from '../../utils/pageAndLimit';
import { PublicTourDetailDto, PublicTourSummaryDto } from '../../dtos/public-response.dto';
import { toPublicTourDetail, toPublicTourSummary } from '../../utils/public-mapper.util';

@Route('tours')
@Tags('Tours Public')
export class TourController extends Controller {
  constructor(private tourService: TourService = new TourService()) {
    super();
  }

  /**
   * Get public active/featured tour packages with dynamic filtering.
   * Returns lightweight PublicTourSummaryDto data suitable for the marketing site.
   */
  @Get('')
  @NoSecurity()
  async getAll(
    @Query() category?: string,
    @Query() categorySlug?: string,
    @Query() categoryId?: string,
    @Query() region?: string,
    @Query() tourType?: TourType,
    @Query() difficulty?: TripDifficulty,
    @Query() status?: TourStatus,
    @Query() search?: string,
    @Query() minPrice?: number,
    @Query() maxPrice?: number,
    @Query() minDuration?: number,
    @Query() maxDuration?: number,
    @Query() sortBy?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<PublicTourSummaryDto[]>> {
    const [items, totalCount] = await this.tourService.getPublicAll({
      category,
      categorySlug,
      categoryId,
      region,
      tourType,
      difficulty,
      status,
      search,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      sortBy,
      limit,
      page,
    });
    const publicItems = items.map(toPublicTourSummary);
    const { data, pagination } = paginateResponse([publicItems, totalCount], limit, page);
    return { data, pagination, message: 'Tours retrieved successfully', success: true };
  }

  /**
   * Get dynamic filter options for tours (styles, categories, tour types, regions, sort options, ranges).
   */
  @Get('filter-options')
  @NoSecurity()
  async getFilterOptions(): Promise<ApiResponse<any>> {
    const data = await this.tourService.getFilterOptions();
    return {
      data,
      message: 'Tour filter options retrieved successfully',
      success: true,
    };
  }

  /**
   * Get active/featured tour package by ID or Slug.
   * Returns sanitized PublicTourDetailDto data for the marketing detail page.
   */
  @Get('{idOrSlug}')
  @NoSecurity()
  async getByIdOrSlug(@Path() idOrSlug: string): Promise<ApiResponse<PublicTourDetailDto>> {
    const tour = await this.tourService.getPublicByIdOrSlug(idOrSlug);
    const data = toPublicTourDetail(tour);
    return { data, message: 'Tour retrieved successfully', success: true };
  }
}
