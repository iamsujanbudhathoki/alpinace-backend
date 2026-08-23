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
  Security,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { Tour, TourStatus, TourType } from '../../entities/tour/Tour.entity';
import { TripDifficulty } from '../../entities/common/difficulty.enum';
import { TourService } from '../../services/tour/tour.service';
import { CreateTourDto, UpdateTourDto } from '../../schemas/tour.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('admin/tours')
@Tags('Admin Tours Management')
@Security('jwt', ['admin'])
export class AdminTourController extends Controller {
  constructor(private tourService: TourService = new TourService()) {
    super();
  }

  /**
   * Admin-only listing of ALL tour packages (including DRAFT, ACTIVE, and FEATURED).
   */
  @Get('')
  async getAll(
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
  ): Promise<ApiResponse<Tour[]>> {
    const dataTotalCount = await this.tourService.getAdminAll({
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
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return { data, pagination, message: 'Admin tours retrieved successfully', success: true };
  }

  /**
   * Admin retrieve tour package by ID or Slug.
   */
  @Get('{idOrSlug}')
  async getByIdOrSlug(@Path() idOrSlug: string): Promise<ApiResponse<Tour>> {
    const data = await this.tourService.getByIdOrSlug(idOrSlug);
    return { data, message: 'Admin tour retrieved successfully', success: true };
  }

  /**
   * Create a new tour package.
   */
  @Post('')
  @Middlewares(RequestValidator.validate(CreateTourDto))
  async create(@Body() body: CreateTourDto): Promise<ApiResponse<Tour>> {
    const data = await this.tourService.create(body);
    return { data, message: 'Tour created successfully', success: true };
  }

  /**
   * Update an existing tour package.
   */
  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateTourDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateTourDto,
  ): Promise<ApiResponse<Tour>> {
    const data = await this.tourService.update(id, body);
    return { data, message: 'Tour updated successfully', success: true };
  }

  /**
   * Delete a tour package.
   */
  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.tourService.delete(id);
    return { data, message: 'Tour deleted successfully', success: true };
  }
}
