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
import { TrekStatus } from '../../entities/trek/Trek.entity';
import { TripDifficulty } from '../../entities/common/difficulty.enum';
import { TrekService } from '../../services/trek/trek.service';
import { paginateResponse } from '../../utils/pageAndLimit';
import { PublicTrekDetailDto, PublicTrekSummaryDto } from '../../dtos/public-response.dto';
import { toPublicTrekDetail, toPublicTrekSummary } from '../../utils/public-mapper.util';

@Route('treks')
@Tags('Trekking Public')
export class TrekkingController extends Controller {
  constructor(private trekService: TrekService = new TrekService()) {
    super();
  }

  /**
   * Get public active/featured trekking packages with dynamic filtering.
   * Returns lightweight PublicTrekSummaryDto data suitable for the marketing site.
   */
  @Get('')
  @NoSecurity()
  async getAll(
    @Query() category?: string,
    @Query() categorySlug?: string,
    @Query() categoryId?: string,
    @Query() region?: string,
    @Query() difficulty?: TripDifficulty,
    @Query() status?: TrekStatus,
    @Query() search?: string,
    @Query() minPrice?: number,
    @Query() maxPrice?: number,
    @Query() minDuration?: number,
    @Query() maxDuration?: number,
    @Query() minAltitude?: number,
    @Query() maxAltitude?: number,
    @Query() sortBy?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<PublicTrekSummaryDto[]>> {
    const [items, totalCount] = await this.trekService.getPublicAll({
      category,
      categorySlug,
      categoryId,
      region,
      difficulty,
      status,
      search,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      minAltitude,
      maxAltitude,
      sortBy,
      limit,
      page,
    });
    const publicItems = items.map(toPublicTrekSummary);
    const { data, pagination } = paginateResponse([publicItems, totalCount], limit, page);
    return {
      data,
      pagination,
      message: 'Trekking packages retrieved successfully',
      success: true,
    };
  }

  /**
   * Get dynamic filter options for trekking (difficulties, categories, regions, sort options, ranges).
   */
  @Get('filter-options')
  @NoSecurity()
  async getFilterOptions(): Promise<ApiResponse<any>> {
    const data = await this.trekService.getFilterOptions();
    return {
      data,
      message: 'Trekking filter options retrieved successfully',
      success: true,
    };
  }

  /**
   * Get active/featured trekking package by ID or Slug.
   * Returns sanitized PublicTrekDetailDto data for the marketing detail page.
   */
  @Get('{idOrSlug}')
  @NoSecurity()
  async getByIdOrSlug(@Path() idOrSlug: string): Promise<ApiResponse<PublicTrekDetailDto>> {
    const trek = await this.trekService.getPublicByIdOrSlug(idOrSlug);
    const data = toPublicTrekDetail(trek);
    return {
      data,
      message: 'Trekking package retrieved successfully',
      success: true,
    };
  }
}
