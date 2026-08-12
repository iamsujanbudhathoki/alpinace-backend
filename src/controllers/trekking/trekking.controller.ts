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

@Route('treks')
@Tags('Trekking (Public)')
export class TrekkingController extends Controller {
  constructor(private packageService: PackageService = new PackageService()) {
    super();
  }

  /**
   * Get all active trekking packages with dynamic filtering.
   */
  @Get('')
  async getAll(
    @Query() categoryId?: string,
    @Query() region?: string,
    @Query() difficulty?: string,
    @Query() search?: string,
    @Query() minPrice?: number,
    @Query() maxPrice?: number,
    @Query() minDuration?: number,
    @Query() maxDuration?: number,
    @Query() sortBy?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<Package[]>> {
    const data = await this.packageService.getAll({
      categoryType: PackageCategoryType.TREKKING,
      categoryId,
      region,
      difficulty,
      status: PackageStatus.ACTIVE,
      search,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      sortBy,
      limit,
      page,
    });
    return { data, message: 'Trekking packages retrieved successfully', success: true };
  }

  /**
   * Get dynamic filter options for trekking (difficulties, categories, regions, sort options, ranges).
   */
  @Get('filter-options')
  async getFilterOptions(): Promise<ApiResponse<any>> {
    const data = await this.packageService.getFilterOptions(
      PackageCategoryType.TREKKING,
    );
    return {
      data,
      message: 'Trekking filter options retrieved successfully',
      success: true,
    };
  }

  /**
   * Get trekking package by ID or Slug.
   */
  @Get('{idOrSlug}')
  async getByIdOrSlug(@Path() idOrSlug: string): Promise<ApiResponse<Package>> {
    const data = await this.packageService.getByIdOrSlug(idOrSlug);
    return { data, message: 'Trekking package retrieved successfully', success: true };
  }
}
