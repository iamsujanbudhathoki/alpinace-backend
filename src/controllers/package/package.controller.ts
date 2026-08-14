import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
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
import { TripDifficulty } from '../../entities/common/difficulty.enum';
import { PackageService } from '../../services/package/package.service';
import {
  CreatePackageDto,
  UpdatePackageDto,
} from '../../schemas/package.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('packages')
@Tags('Packages (Treks, Tours, Expeditions)')
export class PackageController extends Controller {
  constructor(private packageService: PackageService = new PackageService()) {
    super();
  }

  @Get('')
  async getAll(
    @Query() categoryType?: PackageCategoryType,
    @Query() categoryId?: string,
    @Query() region?: string,
    @Query() difficulty?: TripDifficulty,
    @Query() status?: PackageStatus,
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
      categoryType,
      categoryId,
      region,
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
    return { data, message: 'Packages retrieved successfully', success: true };
  }

  @Get('filter-options')
  async getFilterOptions(
    @Query() categoryType?: PackageCategoryType,
  ): Promise<ApiResponse<any>> {
    const data = await this.packageService.getFilterOptions(categoryType);
    return {
      data,
      message: 'Package filter options retrieved successfully',
      success: true,
    };
  }

  @Get('{idOrSlug}')
  async getByIdOrSlug(@Path() idOrSlug: string): Promise<ApiResponse<Package>> {
    const data = await this.packageService.getByIdOrSlug(idOrSlug);
    return { data, message: 'Package retrieved successfully', success: true };
  }

  @Post('')
  @Middlewares(RequestValidator.validate(CreatePackageDto))
  async create(@Body() body: CreatePackageDto): Promise<ApiResponse<Package>> {
    const data = await this.packageService.create(body);
    return { data, message: 'Package created successfully', success: true };
  }

  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdatePackageDto))
  async update(
    @Path() id: string,
    @Body() body: UpdatePackageDto,
  ): Promise<ApiResponse<Package>> {
    const data = await this.packageService.update(id, body);
    return { data, message: 'Package updated successfully', success: true };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.packageService.delete(id);
    return { data, message: 'Package deleted successfully', success: true };
  }
}
