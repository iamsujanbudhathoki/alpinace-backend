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

@Route('admin/expeditions')
@Tags('Admin Expeditions Management')
@Security('jwt', ['admin'])
export class AdminExpeditionController extends Controller {
  constructor(
    private expeditionService: ExpeditionService = new ExpeditionService(),
  ) {
    super();
  }

  /**
   * Admin-only listing of ALL expedition packages (including DRAFT, ACTIVE, and FEATURED).
   */
  @Get('')
  async getAll(
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
   * Admin retrieve expedition package by ID or Slug.
   */
  @Get('{idOrSlug}')
  async getByIdOrSlug(
    @Path() idOrSlug: string,
  ): Promise<ApiResponse<Expedition>> {
    const data = await this.expeditionService.getByIdOrSlug(idOrSlug);
    return {
      data,
      message: 'Admin expedition retrieved successfully',
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
