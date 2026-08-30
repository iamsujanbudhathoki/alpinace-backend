import { Controller, Get, NoSecurity, Route, Tags } from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { SettingService } from '../../services/setting/setting.service';
import { PublicSettingDto } from '../../dtos/public-response.dto';
import { toPublicSetting } from '../../utils/public-mapper.util';

@Route('settings')
@Tags('Public Site Settings')
export class SettingController extends Controller {
  constructor(private settingService: SettingService = new SettingService()) {
    super();
  }

  /**
   * Get public site settings required for site branding and contact information.
   * Returns safe, public configuration keys only.
   */
  @Get('')
  @NoSecurity()
  async getAll(): Promise<ApiResponse<PublicSettingDto>> {
    const rawSettings = await this.settingService.getAll();
    const data = toPublicSetting(rawSettings);
    return { data, message: 'Settings retrieved successfully', success: true };
  }
}
