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
import {
  ClimbingGrade,
  ExpeditionStatus,
} from '../../entities/expedition/Expedition.entity';
import { TripDifficulty } from '../../entities/common/difficulty.enum';
import { ExpeditionService } from '../../services/expedition/expedition.service';
import { paginateResponse } from '../../utils/pageAndLimit';
import {
  PublicExpeditionDetailDto,
  PublicExpeditionSummaryDto,
} from '../../dtos/public-response.dto';
import {
  toPublicExpeditionDetail,
  toPublicExpeditionSummary,
} from '../../utils/public-mapper.util';

@Route('expeditions')
@Tags('Expeditions Public')
export class ExpeditionController extends Controller {
  constructor(
    private expeditionService: ExpeditionService = new ExpeditionService(),
  ) {
    super();
  }

  /**
   * Get public active/featured expedition packages with dynamic filtering.
   * Returns lightweight PublicExpeditionSummaryDto data suitable for marketing site.
   */
  @Get('')
  @NoSecurity()
  async getAll(
    @Query() category?: string,
    @Query() categorySlug?: string,
    @Query() categoryId?: string,
    @Query() region?: string,
    @Query() difficulty?: TripDifficulty,
    @Query() climbingGrade?: ClimbingGrade,
    @Query() status?: ExpeditionStatus,
    @Query() search?: string,
    @Query() minPrice?: number,
    @Query() maxPrice?: number,
    @Query() minAltitude?: number,
    @Query() maxAltitude?: number,
    @Query() minPeakHeight?: number,
    @Query() maxPeakHeight?: number,
    @Query() sortBy?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<PublicExpeditionSummaryDto[]>> {
    const [items, totalCount] = await this.expeditionService.getPublicAll({
      category,
      categorySlug,
      categoryId,
      region,
      difficulty,
      climbingGrade,
      status,
      search,
      minPrice,
      maxPrice,
      minAltitude,
      maxAltitude,
      minPeakHeight,
      maxPeakHeight,
      sortBy,
      limit,
      page,
    });
    const publicItems = items.map(toPublicExpeditionSummary);
    const { data, pagination } = paginateResponse([publicItems, totalCount], limit, page);
    return {
      data,
      pagination,
      message: 'Expeditions retrieved successfully',
      success: true,
    };
  }

  /**
   * Get dynamic filter options for expeditions (alpine grades, categories, peaks, regions, sort options, ranges).
   */
  @Get('filter-options')
  @NoSecurity()
  async getFilterOptions(): Promise<ApiResponse<any>> {
    const data = await this.expeditionService.getFilterOptions();
    return {
      data,
      message: 'Expedition filter options retrieved successfully',
      success: true,
    };
  }

  /**
   * Get active/featured expedition package by ID or Slug.
   * Returns sanitized PublicExpeditionDetailDto data for marketing detail page.
   */
  @Get('{idOrSlug}')
  @NoSecurity()
  async getByIdOrSlug(
    @Path() idOrSlug: string,
  ): Promise<ApiResponse<PublicExpeditionDetailDto>> {
    const exp = await this.expeditionService.getPublicByIdOrSlug(idOrSlug);
    const data = toPublicExpeditionDetail(exp);
    return {
      data,
      message: 'Expedition retrieved successfully',
      success: true,
    };
  }
}
