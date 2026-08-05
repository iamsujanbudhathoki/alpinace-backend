import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Route,
  Tags,
} from 'tsoa';
import { autoInjectable } from 'tsyringe';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { BlogArticle } from '../../entities/blog/BlogArticle.entity';
import { BlogService } from '../../services/blog/blog.service';
import {
  CreateBlogArticleDto,
  UpdateBlogArticleDto,
} from '../../schemas/blog.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('blogs')
@Tags('Blog Articles')
@autoInjectable()
export class BlogController extends Controller {
  constructor(private blogService: BlogService = new BlogService()) {
    super();
  }

  @Get('')
  async getAll(): Promise<ApiResponse<BlogArticle[]>> {
    const data = await this.blogService.getAll();
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
