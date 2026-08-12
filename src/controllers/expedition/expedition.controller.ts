import {
  Controller,
  Get,
  Path,
  Query,
  Route,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import {
  Package,
  PackageCategoryType,
  PackageStatus,
} from '../../entities/package/Package.entity';
import { PackageService } from '../../services/package/package.service';

@Route('expeditions')
@Tags('Expeditions (Public)')
export class ExpeditionController extends Controller {
  constructor(private packageService: PackageService = new PackageService()) {
    super();
  }

  /**
   * Get all active expedition packages with dynamic filtering.
   */
  @Get('')
  async getAll(
    @Query() categoryId?: string,
    @Query() region?: string,
    @Query() difficulty?: string,
    @Query() search?: string,
    @Query() minPrice?: number,
    @Query() maxPrice?: number,
    @Query() minAltitude?: number,
    @Query() maxAltitude?: number,
    @Query() sortBy?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<Package[]>> {
    const data = await this.packageService.getAll({
      categoryType: PackageCategoryType.EXPEDITION,
      categoryId,
      region,
      difficulty,
      status: PackageStatus.ACTIVE,
      search,
      minPrice,
      maxPrice,
      minAltitude,
      maxAltitude,
      sortBy,
      limit,
      page,
    });
    return { data, message: 'Expeditions retrieved successfully', success: true };
  }

  /**
   * Get dynamic filter options for expeditions (alpine grades, categories, peaks, regions, sort options, ranges).
   */
  @Get('filter-options')
  async getFilterOptions(): Promise<ApiResponse<any>> {
    const data = await this.packageService.getFilterOptions(
      PackageCategoryType.EXPEDITION,
    );
    return {
      data,
      message: 'Expedition filter options retrieved successfully',
      success: true,
    };
  }

  /**
   * Get expedition package by ID or Slug.
   */
  @Get('{idOrSlug}')
  async getByIdOrSlug(@Path() idOrSlug: string): Promise<ApiResponse<Package>> {
    const data = await this.packageService.getByIdOrSlug(idOrSlug);
    return { data, message: 'Expedition retrieved successfully', success: true };
  }
}
