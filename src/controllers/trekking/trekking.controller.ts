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
import { Trek, TrekStatus } from '../../entities/trek/Trek.entity';
import { TripDifficulty } from '../../entities/common/difficulty.enum';
import { TrekService } from '../../services/trek/trek.service';
import { CreateTrekDto, UpdateTrekDto } from '../../schemas/trek.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('treks')
@Tags('Trekking')
@Security('jwt', ['admin'])
export class TrekkingController extends Controller {
  constructor(private trekService: TrekService = new TrekService()) {
    super();
  }

  /**
   * Get all trekking packages with dynamic filtering.
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
  ): Promise<ApiResponse<Trek[]>> {
    const dataTotalCount = await this.trekService.getPublicAll({
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
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return {
      data,
      pagination,
      message: 'Trekking packages retrieved successfully',
      success: true,
    };
  }

  /**
   * Admin-only listing of ALL trekking packages (including DRAFT, ACTIVE, and FEATURED).
   */
  @Get('admin')
  async getAdminAll(
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
  ): Promise<ApiResponse<Trek[]>> {
    const dataTotalCount = await this.trekService.getAdminAll({
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
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return {
      data,
      pagination,
      message: 'Admin trekking packages retrieved successfully',
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
   * Get trekking package by ID or Slug (public active/featured only).
   */
  @Get('{idOrSlug}')
  @NoSecurity()
  async getByIdOrSlug(@Path() idOrSlug: string): Promise<ApiResponse<Trek>> {
    const data = await this.trekService.getPublicByIdOrSlug(idOrSlug);
    return {
      data,
      message: 'Trekking package retrieved successfully',
      success: true,
    };
  }

  /**
   * Create a new trekking package.
   */
  @Post('')
  @Middlewares(RequestValidator.validate(CreateTrekDto))
  async create(@Body() body: CreateTrekDto): Promise<ApiResponse<Trek>> {
    const data = await this.trekService.create(body);
    return { data, message: 'Trek created successfully', success: true };
  }

  /**
   * Update an existing trekking package.
   */
  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateTrekDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateTrekDto,
  ): Promise<ApiResponse<Trek>> {
    const data = await this.trekService.update(id, body);
    return { data, message: 'Trek updated successfully', success: true };
  }

  /**
   * Delete a trekking package.
   */
  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.trekService.delete(id);
    return { data, message: 'Trek deleted successfully', success: true };
  }
}
