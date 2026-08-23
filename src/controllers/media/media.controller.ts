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
  UploadedFile,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import {
  MediaService,
  MediaUploadResult,
} from '../../services/media/media.service';
import { UpdateMediaDto } from '../../schemas/media.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('media')
@Tags('Media Library')
@Security('jwt', ['admin'])
export class MediaController extends Controller {
  constructor(private mediaService: MediaService = new MediaService()) {
    super();
  }

  @Post('upload')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query() categoryId?: string,
  ): Promise<ApiResponse<MediaUploadResult>> {
    const data = await this.mediaService.saveUploadedFile(file, categoryId);
    return {
      data,
      message: 'File uploaded and saved to database successfully',
      success: true,
    };
  }

  @Get()
  async getAllMedia(
    @Query() categoryId?: string,
    @Query() category?: string,
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
  ): Promise<ApiResponse<MediaUploadResult[]>> {
    const dataTotalCount = await this.mediaService.getAll({
      categoryId,
      category,
      search,
      limit,
      page,
    });
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return {
      data,
      pagination,
      message: 'Media assets retrieved successfully',
      success: true,
    };
  }

  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateMediaDto))
  async updateMedia(
    @Path() id: string,
    @Body() body: UpdateMediaDto,
  ): Promise<ApiResponse<MediaUploadResult>> {
    const data = await this.mediaService.update(id, body);
    return {
      data,
      message: 'Media metadata updated successfully',
      success: true,
    };
  }

  @Delete('{id}')
  async deleteMedia(@Path() id: string): Promise<ApiResponse<boolean>> {
    const success = await this.mediaService.delete(id);
    return {
      data: success,
      message: success ? 'Media deleted successfully' : 'Media not found',
      success,
    };
  }
}
