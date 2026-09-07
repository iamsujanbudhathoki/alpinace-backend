import { Controller, Get, Path, Query, Route, Tags } from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { Activity, ActivityStatus } from '../../entities/activity/Activity.entity';
import { ActivityService } from '../../services/activity/activity.service';
import { TrekService } from '../../services/trek/trek.service';
import { TourService } from '../../services/tour/tour.service';
import { ExpeditionService } from '../../services/expedition/expedition.service';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('activities')
@Tags('Public Activities')
export class ActivityController extends Controller {
  constructor(
    private activityService: ActivityService = new ActivityService(),
    private trekService: TrekService = new TrekService(),
    private tourService: TourService = new TourService(),
    private expeditionService: ExpeditionService = new ExpeditionService(),
  ) {
    super();
  }

  /**
   * Get active public activities list.
   */
  @Get('')
  async getAll(
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
    @Query() isFeatured?: boolean,
  ): Promise<ApiResponse<Activity[]>> {
    const dataTotalCount = await this.activityService.getAll({
      status: ActivityStatus.ACTIVE,
      search,
      limit,
      page,
      isFeatured,
    });
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return {
      data,
      pagination,
      message: 'Public activities retrieved successfully',
      success: true,
    };
  }

  /**
   * Get activity details and associated packages (treks, tours, expeditions).
   */
  @Get('{slug}')
  async getBySlug(
    @Path() slug: string,
  ): Promise<
    ApiResponse<{
      activity: Activity;
      treks: any[];
      tours: any[];
      expeditions: any[];
    }>
  > {
    const activity = await this.activityService.getByIdOrSlug(slug);

    const [treks] = await this.trekService.getAll({
      activityId: activity.id,
      isPublic: true,
    });
    const [tours] = await this.tourService.getAll({
      activityId: activity.id,
      isPublic: true,
    });
    const [expeditions] = await this.expeditionService.getAll({
      activityId: activity.id,
      isPublic: true,
    });

    return {
      data: {
        activity,
        treks,
        tours,
        expeditions,
      },
      message: 'Activity and linked packages retrieved successfully',
      success: true,
    };
  }
}
