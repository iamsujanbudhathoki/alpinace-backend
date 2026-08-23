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
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { Guide } from '../../entities/guide/Guide.entity';
import { GuideService } from '../../services/guide/guide.service';
import { CreateGuideDto, UpdateGuideDto } from '../../schemas/guide.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('guides')
@Tags('Guides')
@Security('jwt', ['admin'])
export class GuideController extends Controller {
  constructor(private guideService: GuideService = new GuideService()) {
    super();
  }

  @Get('')
  @NoSecurity()
  async getAll(): Promise<ApiResponse<Guide[]>> {
    const data = await this.guideService.getAll();
    return { data, message: 'Guides retrieved successfully', success: true };
  }

  @Get('{id}')
  @NoSecurity()
  async getById(@Path() id: string): Promise<ApiResponse<Guide>> {
    const data = await this.guideService.getById(id);
    return { data, message: 'Guide retrieved successfully', success: true };
  }

  @Post('')
  @Middlewares(RequestValidator.validate(CreateGuideDto))
  async create(@Body() body: CreateGuideDto): Promise<ApiResponse<Guide>> {
    const data = await this.guideService.create(body);
    return { data, message: 'Guide created successfully', success: true };
  }

  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateGuideDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateGuideDto,
  ): Promise<ApiResponse<Guide>> {
    const data = await this.guideService.update(id, body);
    return { data, message: 'Guide updated successfully', success: true };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.guideService.delete(id);
    return { data, message: 'Guide deleted successfully', success: true };
  }
}
