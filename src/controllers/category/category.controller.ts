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
import { autoInjectable } from 'tsyringe';
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

@Route('categories')
@Tags('Categories')
@autoInjectable()
export class CategoryController extends Controller {
  constructor(
    private categoryService: CategoryService = new CategoryService(),
  ) {
    super();
  }

  @Get('')
  async getAll(@Query() type?: CategoryType): Promise<ApiResponse<Category[]>> {
    const data = type
      ? await this.categoryService.getByType(type)
      : await this.categoryService.getAll();
    return {
      data,
      message: 'Categories retrieved successfully',
      success: true,
    };
  }

  @Get('{id}')
  async getById(@Path() id: string): Promise<ApiResponse<Category>> {
    const data = await this.categoryService.getById(id);
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
