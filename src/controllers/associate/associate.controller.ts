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
import { Associate, AssociateStatus } from '../../entities/associate/Associate.entity';
import { AssociateService } from '../../services/associate/associate.service';
import {
  CreateAssociateDto,
  UpdateAssociateDto,
} from '../../schemas/associate.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('associates')
@Tags('Associates & Partners')
export class AssociateController extends Controller {
  constructor(
    private associateService: AssociateService = new AssociateService(),
  ) {
    super();
  }

  @Get('')
  async getAll(
    @Query() status?: AssociateStatus,
  ): Promise<ApiResponse<Associate[]>> {
    const data = await this.associateService.getAll(status);
    return {
      data,
      message: 'Associates retrieved successfully',
      success: true,
    };
  }

  @Get('{id}')
  async getById(@Path() id: string): Promise<ApiResponse<Associate>> {
    const data = await this.associateService.getById(id);
    return {
      data,
      message: 'Associate retrieved successfully',
      success: true,
    };
  }

  @Post('')
  @Middlewares(RequestValidator.validate(CreateAssociateDto))
  async create(
    @Body() body: CreateAssociateDto,
  ): Promise<ApiResponse<Associate>> {
    const data = await this.associateService.create(body);
    return {
      data,
      message: 'Associate created successfully',
      success: true,
    };
  }

  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateAssociateDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateAssociateDto,
  ): Promise<ApiResponse<Associate>> {
    const data = await this.associateService.update(id, body);
    return {
      data,
      message: 'Associate updated successfully',
      success: true,
    };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.associateService.delete(id);
    return {
      data,
      message: 'Associate deleted successfully',
      success: true,
    };
  }
}
