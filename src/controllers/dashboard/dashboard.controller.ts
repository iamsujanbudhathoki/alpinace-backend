import { Controller, Get, Route, Tags } from 'tsoa';
import { autoInjectable } from 'tsyringe';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import {
  DashboardMetricsResponse,
  DashboardService,
} from '../../services/dashboard/dashboard.service';

@Route('admin/dashboard')
@Tags('Admin Dashboard')
@autoInjectable()
export class DashboardController extends Controller {
  constructor(
    private dashboardService: DashboardService = new DashboardService(),
  ) {
    super();
  }

  @Get('')
  async getMetrics(): Promise<ApiResponse<DashboardMetricsResponse>> {
    const data = await this.dashboardService.getMetrics();
    return {
      data,
      message: 'Dashboard metrics retrieved successfully',
      success: true,
    };
  }
}
