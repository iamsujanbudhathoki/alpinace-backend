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
import { Activity, ActivityStatus } from '../../entities/activity/Activity.entity';
import { ActivityService } from '../../services/activity/activity.service';
import { CreateActivityDto, UpdateActivityDto } from '../../schemas/activity.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('admin/activities')
@Tags('Admin Activities Management')
@Security('jwt', ['admin'])
export class AdminActivityController extends Controller {
  constructor(
    private activityService: ActivityService = new ActivityService(),
  ) {
    super();
  }

  @Get('')
  async getAll(
    @Query() status?: ActivityStatus,
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
    @Query() isFeatured?: boolean,
  ): Promise<ApiResponse<Activity[]>> {
    const dataTotalCount = await this.activityService.getAll({
      status,
      search,
      limit,
      page,
      isFeatured,
    });
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return {
      data,
      pagination,
      message: 'Admin activities retrieved successfully',
      success: true,
    };
  }

  @Get('{idOrSlug}')
  async getByIdOrSlug(@Path() idOrSlug: string): Promise<ApiResponse<Activity>> {
    const data = await this.activityService.getByIdOrSlug(idOrSlug);
    return { data, message: 'Admin activity retrieved successfully', success: true };
  }

  @Post('')
  @Middlewares(RequestValidator.validate(CreateActivityDto))
  async create(
    @Body() body: CreateActivityDto,
  ): Promise<ApiResponse<Activity>> {
    const data = await this.activityService.create(body);
    return { data, message: 'Activity created successfully', success: true };
  }

  @Put('reorder')
  async reorder(
    @Body() body: { items: { id: string; menuOrder: number }[] },
  ): Promise<ApiResponse<boolean>> {
    const data = await this.activityService.reorderActivities(body.items || []);
    return { data, message: 'Activity menu ordering updated successfully', success: true };
  }

  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateActivityDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateActivityDto,
  ): Promise<ApiResponse<Activity>> {
    const data = await this.activityService.update(id, body);
    return { data, message: 'Activity updated successfully', success: true };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.activityService.delete(id);
    return { data, message: 'Activity deleted successfully', success: true };
  }
}
