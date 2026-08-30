import { Body, Controller, Get, Middlewares, Put, Route, Security, Tags } from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { SettingService } from '../../services/setting/setting.service';
import { UpdateSettingsDto } from '../../schemas/setting.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';

@Route('admin/settings')
@Tags('Admin Site Settings')
@Security('jwt', ['admin'])
export class AdminSettingController extends Controller {
  constructor(private settingService: SettingService = new SettingService()) {
    super();
  }

  /**
   * Get all management site settings for admin panel.
   */
  @Get('')
  async getAll(): Promise<ApiResponse<Record<string, string>>> {
    const data = await this.settingService.getAll();
    return { data, message: 'Admin settings retrieved successfully', success: true };
  }

  /**
   * Update site settings.
   */
  @Put('')
  @Middlewares(RequestValidator.validate(UpdateSettingsDto))
  async update(
    @Body() body: UpdateSettingsDto,
  ): Promise<ApiResponse<Record<string, string>>> {
    const data = await this.settingService.update(body);
    return { data, message: 'Settings updated successfully', success: true };
  }
}
