import { Body, Controller, Get, Middlewares, NoSecurity, Put, Route, Security, Tags } from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { SettingService } from '../../services/setting/setting.service';
import { UpdateSettingsDto } from '../../schemas/setting.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('settings')
@Tags('Site Settings')
@Security('jwt', ['admin'])
export class SettingController extends Controller {
  constructor(private settingService: SettingService = new SettingService()) {
    super();
  }

  @Get('')
  @NoSecurity()
  async getAll(): Promise<ApiResponse<Record<string, string>>> {
    const data = await this.settingService.getAll();
    return { data, message: 'Settings retrieved successfully', success: true };
  }

  @Put('')
  @Middlewares(RequestValidator.validate(UpdateSettingsDto))
  async update(
    @Body() body: UpdateSettingsDto,
  ): Promise<ApiResponse<Record<string, string>>> {
    const data = await this.settingService.update(body);
    return { data, message: 'Settings updated successfully', success: true };
  }
}
