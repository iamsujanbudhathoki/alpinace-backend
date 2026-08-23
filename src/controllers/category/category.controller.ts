import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  NoSecurity,
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
  Category,
  CategoryType,
} from '../../entities/category/Category.entity';
import { CategoryService } from '../../services/category/category.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../schemas/category.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('categories')
@Tags('Categories')
@Security('jwt', ['admin'])
export class CategoryController extends Controller {
  constructor(
    private categoryService: CategoryService = new CategoryService(),
  ) {
    super();
  }

  @Get('')
  @NoSecurity()
  async getAll(
    @Query() type?: CategoryType,
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<Category[]>> {
    const dataTotalCount = await this.categoryService.getAll({
      type,
      search,
      limit,
      page,
    });
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return {
      data,
      pagination,
      message: 'Categories retrieved successfully',
      success: true,
    };
  }

  @Get('{idOrSlug}')
  @NoSecurity()
  async getByIdOrSlug(@Path() idOrSlug: string): Promise<ApiResponse<Category>> {
    const data = await this.categoryService.getByIdOrSlug(idOrSlug);
    return { data, message: 'Category retrieved successfully', success: true };
  }

  @Post('')
  @Middlewares(RequestValidator.validate(CreateCategoryDto))
  async create(
    @Body() body: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const data = await this.categoryService.create(body);
    return { data, message: 'Category created successfully', success: true };
  }

  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateCategoryDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const data = await this.categoryService.update(id, body);
    return { data, message: 'Category updated successfully', success: true };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.categoryService.delete(id);
    return { data, message: 'Category deleted successfully', success: true };
  }
}
