import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Route,
  Tags,
  UploadedFile,
  Path,
  Body,
  Middlewares,
} from 'tsoa';
import { autoInjectable } from 'tsyringe';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import {
  MediaService,
  MediaUploadResult,
} from '../../services/media/media.service';
import { UpdateMediaDto } from '../../schemas/media.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('media')
@Tags('Media Uploads')
@autoInjectable()
export class MediaController extends Controller {
  constructor(private mediaService: MediaService = new MediaService()) {
    super();
  }

  @Post('upload')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ApiResponse<MediaUploadResult>> {
    const data = await this.mediaService.saveUploadedFile(file);
    return {
      data,
      message: 'File uploaded and saved to database successfully',
      success: true,
    };
  }

  @Get()
  async getAllMedia(): Promise<ApiResponse<MediaUploadResult[]>> {
    const data = await this.mediaService.getAll();
    return {
      data,
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
