import {
  Controller,
  Get,
  Middlewares,
  NoSecurity,
  Path,
  Query,
  Route,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { BlogStatus } from '../../entities/blog/BlogArticle.entity';
import { BlogService } from '../../services/blog/blog.service';
import { GetBlogsQueryDto } from '../../schemas/blog.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';
import { PublicBlogDetailDto, PublicBlogSummaryDto } from '../../dtos/public-response.dto';
import { toPublicBlogDetail, toPublicBlogSummary } from '../../utils/public-mapper.util';

@Route('blogs')
@Tags('Blog Articles Public')
export class BlogController extends Controller {
  constructor(private blogService: BlogService = new BlogService()) {
    super();
  }

  /**
   * Get public published blog articles with optional category and search filtering.
   * Returns lightweight PublicBlogSummaryDto data.
   */
  @Get('')
  @NoSecurity()
  @Middlewares(RequestValidator.validateQuery(GetBlogsQueryDto))
  async getAll(
    @Query() status?: BlogStatus,
    @Query() categoryId?: string,
    @Query() category?: string,
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<PublicBlogSummaryDto[]>> {
    const [items, totalCount] = await this.blogService.getPublicAll(
      status,
      categoryId,
      category,
      search,
      limit,
      page,
    );
    const publicItems = items.map(toPublicBlogSummary);
    const { data, pagination } = paginateResponse([publicItems, totalCount], limit, page);
    return {
      data,
      pagination,
      message: 'Blog articles retrieved successfully',
      success: true,
    };
  }

  /**
   * Get public published blog article by ID or Slug.
   * Returns sanitized PublicBlogDetailDto data.
   */
  @Get('{idOrSlug}')
  @NoSecurity()
  async getByIdOrSlug(
    @Path() idOrSlug: string,
  ): Promise<ApiResponse<PublicBlogDetailDto>> {
    const blog = await this.blogService.getPublicByIdOrSlug(idOrSlug);
    const data = toPublicBlogDetail(blog);
    return {
      data,
      message: 'Blog article retrieved successfully',
      success: true,
    };
  }
}
