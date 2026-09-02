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

  /**
   * Get the public Privacy Policy content.
   * Returns only the privacy policy HTML content — no other settings are exposed.
   */
  @Get('privacy-policy')
  @NoSecurity()
  async getPrivacyPolicy(): Promise<ApiResponse<{ content: string | null }>> {
    const rawSettings = await this.settingService.getAll();
    const content = rawSettings['privacyPolicy'] ?? null;
    return {
      data: { content },
      message: 'Privacy policy retrieved successfully',
      success: true,
    };
  }

  /**
   * Get the public Terms & Conditions content.
   * Returns only the terms and conditions HTML content — no other settings are exposed.
   */
  @Get('terms-and-conditions')
  @NoSecurity()
  async getTermsAndConditions(): Promise<ApiResponse<{ content: string | null }>> {
    const rawSettings = await this.settingService.getAll();
    const content = rawSettings['termsAndConditions'] ?? null;
    return {
      data: { content },
      message: 'Terms & conditions retrieved successfully',
      success: true,
    };
  }
}
