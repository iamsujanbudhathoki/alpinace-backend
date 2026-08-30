import { Controller, Get, Query, Route, Security, Tags } from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import {
  AdminSearchResponse,
  AdminSearchService,
} from '../../services/admin-search/admin-search.service';

@Route('admin/search')
@Tags('Admin Search')
@Security('jwt', ['admin'])
export class AdminSearchController extends Controller {
  constructor(
    private searchService: AdminSearchService = new AdminSearchService(),
  ) {
    super();
  }

  @Get('')
  async search(
    @Query() q: string,
  ): Promise<ApiResponse<AdminSearchResponse>> {
    const data = await this.searchService.search(q);
    return {
      data,
      message: 'Admin search completed successfully',
      success: true,
    };
  }
}
