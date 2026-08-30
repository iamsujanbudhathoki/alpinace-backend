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
import {
  Category,
  CategoryStatus,
  CategoryType,
} from '../../entities/category/Category.entity';
import { CategoryService } from '../../services/category/category.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../schemas/category.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('admin/categories')
@Tags('Admin Categories Management')
@Security('jwt', ['admin'])
export class AdminCategoryController extends Controller {
  constructor(
    private categoryService: CategoryService = new CategoryService(),
  ) {
    super();
  }

  /**
   * Admin-only listing of ALL categories (including ACTIVE and DRAFT).
   */
  @Get('')
  async getAll(
    @Query() status?: CategoryStatus,
    @Query() type?: CategoryType,
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
    @Query() parentId?: string,
    @Query() parentsOnly?: boolean,
  ): Promise<ApiResponse<Category[]>> {
    const dataTotalCount = await this.categoryService.getAll({
      status,
      type,
      search,
      limit,
      page,
      parentId,
      parentsOnly,
    });
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return {
      data,
      pagination,
      message: 'Admin categories retrieved successfully',
      success: true,
    };
  }

  @Get('{idOrSlug}')
  async getByIdOrSlug(@Path() idOrSlug: string): Promise<ApiResponse<Category>> {
    const data = await this.categoryService.getByIdOrSlug(idOrSlug);
    return { data, message: 'Admin category retrieved successfully', success: true };
  }

  @Post('')
  @Middlewares(RequestValidator.validate(CreateCategoryDto))
  async create(
    @Body() body: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const data = await this.categoryService.create(body);
    return { data, message: 'Category created successfully', success: true };
  }

  @Put('reorder')
  async reorder(
    @Body() body: { items: { id: string; menuOrder: number }[] },
  ): Promise<ApiResponse<boolean>> {
    const data = await this.categoryService.reorderCategories(body.items || []);
    return { data, message: 'Category menu ordering updated successfully', success: true };
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
