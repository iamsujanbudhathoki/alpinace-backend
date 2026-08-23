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
import {
  ClimbingGrade,
  Expedition,
  ExpeditionStatus,
} from '../../entities/expedition/Expedition.entity';
import { TripDifficulty } from '../../entities/common/difficulty.enum';
import { ExpeditionService } from '../../services/expedition/expedition.service';
import {
  CreateExpeditionDto,
  UpdateExpeditionDto,
} from '../../schemas/expedition.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('expeditions')
@Tags('Expeditions')
@Security('jwt', ['admin'])
export class ExpeditionController extends Controller {
  constructor(
    private expeditionService: ExpeditionService = new ExpeditionService(),
  ) {
    super();
  }

  /**
   * Get all active expedition packages with dynamic filtering.
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
  ): Promise<ApiResponse<Expedition[]>> {
    const dataTotalCount = await this.expeditionService.getPublicAll({
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
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return {
      data,
      pagination,
      message: 'Expeditions retrieved successfully',
      success: true,
    };
  }

  /**
   * Admin-only listing of ALL expedition packages (including DRAFT, ACTIVE, and FEATURED).
   */
  @Get('admin')
  async getAdminAll(
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
  ): Promise<ApiResponse<Expedition[]>> {
    const dataTotalCount = await this.expeditionService.getAdminAll({
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
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return {
      data,
      pagination,
      message: 'Admin expeditions retrieved successfully',
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
   * Get expedition package by ID or Slug (public active/featured only).
   */
  @Get('{idOrSlug}')
  @NoSecurity()
  async getByIdOrSlug(
    @Path() idOrSlug: string,
  ): Promise<ApiResponse<Expedition>> {
    const data = await this.expeditionService.getPublicByIdOrSlug(idOrSlug);
    return {
      data,
      message: 'Expedition retrieved successfully',
      success: true,
    };
  }

  /**
   * Create a new expedition package.
   */
  @Post('')
  @Middlewares(RequestValidator.validate(CreateExpeditionDto))
  async create(
    @Body() body: CreateExpeditionDto,
  ): Promise<ApiResponse<Expedition>> {
    const data = await this.expeditionService.create(body);
    return { data, message: 'Expedition created successfully', success: true };
  }

  /**
   * Update an existing expedition package.
   */
  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateExpeditionDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateExpeditionDto,
  ): Promise<ApiResponse<Expedition>> {
    const data = await this.expeditionService.update(id, body);
    return { data, message: 'Expedition updated successfully', success: true };
  }

  /**
   * Delete an expedition package.
   */
  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.expeditionService.delete(id);
    return { data, message: 'Expedition deleted successfully', success: true };
  }
}
