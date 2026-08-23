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
import { BlogArticle, BlogStatus } from '../../entities/blog/BlogArticle.entity';
import { BlogService } from '../../services/blog/blog.service';
import {
  CreateBlogArticleDto,
  GetBlogsQueryDto,
  UpdateBlogArticleDto,
} from '../../schemas/blog.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('admin/blogs')
@Tags('Admin Blogs Management')
@Security('jwt', ['admin'])
export class AdminBlogController extends Controller {
  constructor(private blogService: BlogService = new BlogService()) {
    super();
  }

  /**
   * Admin-only listing of ALL blog articles (including DRAFT, PUBLISHED, and ARCHIVED).
   */
  @Get('')
  @Middlewares(RequestValidator.validateQuery(GetBlogsQueryDto))
  async getAll(
    @Query() status?: BlogStatus,
    @Query() categoryId?: string,
    @Query() category?: string,
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<BlogArticle[]>> {
    const dataTotalCount = await this.blogService.getAdminAll(
      status,
      categoryId,
      category,
      search,
      limit,
      page,
    );
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return {
      data,
      pagination,
      message: 'Admin blog articles retrieved successfully',
      success: true,
    };
  }

  /**
   * Admin retrieve blog article by ID or Slug.
   */
  @Get('{idOrSlug}')
  async getByIdOrSlug(
    @Path() idOrSlug: string,
  ): Promise<ApiResponse<BlogArticle>> {
    const data = await this.blogService.getByIdOrSlug(idOrSlug);
    return {
      data,
      message: 'Admin blog article retrieved successfully',
      success: true,
    };
  }

  /**
   * Create a new blog article.
   */
  @Post('')
  @Middlewares(RequestValidator.validate(CreateBlogArticleDto))
  async create(
    @Body() body: CreateBlogArticleDto,
  ): Promise<ApiResponse<BlogArticle>> {
    const data = await this.blogService.create(body);
    return {
      data,
      message: 'Blog article created successfully',
      success: true,
    };
  }

  /**
   * Update an existing blog article.
   */
  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateBlogArticleDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateBlogArticleDto,
  ): Promise<ApiResponse<BlogArticle>> {
    const data = await this.blogService.update(id, body);
    return {
      data,
      message: 'Blog article updated successfully',
      success: true,
    };
  }

  /**
   * Delete a blog article.
   */
  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.blogService.delete(id);
    return {
      data,
      message: 'Blog article deleted successfully',
      success: true,
    };
  }
}
