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
import { BlogArticle, BlogStatus } from '../../entities/blog/BlogArticle.entity';
import { BlogService } from '../../services/blog/blog.service';
import {
  CreateBlogArticleDto,
  GetBlogsQueryDto,
  UpdateBlogArticleDto,
} from '../../schemas/blog.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('blogs')
@Tags('Blog Articles')
export class BlogController extends Controller {
  constructor(private blogService: BlogService = new BlogService()) {
    super();
  }

  /**
   * Get all blog articles with optional status, category, and search filtering.
   * Pass ?status=Published to only retrieve published articles.
   * Pass ?categoryId=... to filter by category ID.
   * Pass ?search=... to search within title, excerpt, and category.
   */
  @Get('')
  @Middlewares(RequestValidator.validateQuery(GetBlogsQueryDto))
  async getAll(
    @Query() status?: BlogStatus,
    @Query() categoryId?: string,
    @Query() category?: string,
    @Query() search?: string,
  ): Promise<ApiResponse<BlogArticle[]>> {
    const data = await this.blogService.getAll(
      status,
      categoryId,
      category,
      search,
    );
    return {
      data,
      message: 'Blog articles retrieved successfully',
      success: true,
    };
  }

  @Get('{idOrSlug}')
  async getByIdOrSlug(
    @Path() idOrSlug: string,
  ): Promise<ApiResponse<BlogArticle>> {
    const data = await this.blogService.getByIdOrSlug(idOrSlug);
    return {
      data,
      message: 'Blog article retrieved successfully',
      success: true,
    };
  }

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
