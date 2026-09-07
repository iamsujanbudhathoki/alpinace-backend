import { Controller, Get, NoSecurity, Query, Route, Tags } from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { PublicSearchResponseDto, PublicSearchType } from '../../dtos/public-search.dto';
import { PublicSearchService } from '../../services/search/public-search.service';

@Route('search')
@Tags('Public Search')
export class PublicSearchController extends Controller {
  constructor(private searchService: PublicSearchService = new PublicSearchService()) {
    super();
  }

  /**
   * Public Search API Route
   * Performs real-time search across active published Treks, Tours, Expeditions, and Blogs.
   * No authentication required.
   */
  @Get('')
  @NoSecurity()
  async search(
    @Query() q?: string,
    @Query() query?: string,
    @Query() type?: PublicSearchType,
    @Query() limit?: number,
  ): Promise<ApiResponse<PublicSearchResponseDto>> {
    const searchQuery = (q || query || '').trim();
    const data = await this.searchService.search({
      query: searchQuery,
      type,
      limit: limit ? Number(limit) : undefined,
    });

    return {
      data,
      message: 'Public search executed successfully',
      success: true,
    };
  }
}
