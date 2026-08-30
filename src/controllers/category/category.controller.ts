import {
  Controller,
  Get,
  NoSecurity,
  Path,
  Query,
  Route,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import {
  CategoryStatus,
  CategoryType,
} from '../../entities/category/Category.entity';
import { CategoryService } from '../../services/category/category.service';
import { paginateResponse } from '../../utils/pageAndLimit';
import { PublicCategoryDto } from '../../dtos/public-response.dto';
import { toPublicCategory } from '../../utils/public-mapper.util';

@Route('categories')
@Tags('Categories Public')
export class CategoryController extends Controller {
  constructor(
    private categoryService: CategoryService = new CategoryService(),
  ) {
    super();
  }

  /**
   * Get public active categories with optional type and search filters.
   */
  @Get('')
  @NoSecurity()
  async getAll(
    @Query() type?: CategoryType,
    @Query() parentsOnly?: boolean,
    @Query() parentId?: string,
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<PublicCategoryDto[]>> {
    const [items, totalCount] = await this.categoryService.getAll({
      status: CategoryStatus.ACTIVE,
      type,
      parentsOnly,
      parentId,
      search,
      limit,
      page,
    });
    const publicItems = items.map(toPublicCategory);
    const { data, pagination } = paginateResponse([publicItems, totalCount], limit, page);
    return {
      data,
      pagination,
      message: 'Categories retrieved successfully',
      success: true,
    };
  }

  /**
   * Get menu-visible categories structured tree for public marketing navbar navigation.
   */
  @Get('nav')
  @NoSecurity()
  async getNavMenu(): Promise<ApiResponse<PublicCategoryDto[]>> {
    const items = await this.categoryService.getNavMenu();
    const data = items.map(toPublicCategory);
    return {
      data,
      message: 'Navigation categories retrieved successfully',
      success: true,
    };
  }

  /**
   * Get public active category by ID or Slug.
   */
  @Get('{idOrSlug}')
  @NoSecurity()
  async getByIdOrSlug(@Path() idOrSlug: string): Promise<ApiResponse<PublicCategoryDto>> {
    const category = await this.categoryService.getByIdOrSlug(idOrSlug);
    const data = toPublicCategory(category);
    return { data, message: 'Category retrieved successfully', success: true };
  }
}
