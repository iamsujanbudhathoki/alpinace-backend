import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Setting } from '../../entities/setting/Setting.entity';
import { UpdateSettingsDto } from '../../schemas/setting.schema';

@autoInjectable()
export class SettingService {
  private repo = AppDataSource.getRepository(Setting);

  async getAll(): Promise<Record<string, string>> {
    const settings = await this.repo.find();
    const map: Record<string, string> = {
      // General Info
      siteName: 'Alpine Ace Expeditions',
      tagline: 'Venture Beyond the Ordinary',
      contactEmail: 'info@alpineace.com',
      contactPhone: '+977 1 4700543',
      emergencyPhone: '+977 9851000000',
      whatsappNumber: '9779851000000',
      companyAddress: 'Thamel Marg, Ward 26, Kathmandu, Nepal',
      googleMapsUrl: 'https://maps.google.com/?q=Thamel+Kathmandu+Nepal',
      officeHours: 'Sun - Fri: 09:00 AM - 06:00 PM (NPT)',

      // SEO & Analytics
      metaTitle:
        'Alpine Ace | Nepal Trekking, Historical Tours & Peak Expeditions',
      metaDescription:
        "Experience Nepal's spectacular trekking routes, historical tours, and elite peak expeditions under the safe guidance of multi-summit Sherpas.",
      metaKeywords:
        'Nepal trekking, Everest Base Camp, Annapurna Circuit, peak climbing, Sherpa guides, luxury mountain lodges',
      canonicalUrl: 'https://alpineace.com',
      googleAnalyticsId: '',
      googleSiteVerification: '',

      // Social Links
      facebookUrl: 'https://facebook.com/alpineacenepal',
      instagramUrl: 'https://instagram.com/alpineacenepal',
      youtubeUrl: 'https://youtube.com/@alpineacenepal',
      tripadvisorUrl: 'https://tripadvisor.com',
      linkedinUrl: 'https://linkedin.com/company/alpine-ace-expeditions',
    };

    settings.forEach((s) => {
      map[s.key] = s.value;
    });

    return map;
  }

  async update(dto: UpdateSettingsDto): Promise<Record<string, string>> {
    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined) {
        const valStr =
          typeof value === 'object' && value !== null
            ? JSON.stringify(value)
            : String(value);
        let setting = await this.repo.findOne({ where: { key } });
        if (!setting) {
          setting = this.repo.create({ key, value: valStr });
        } else {
          setting.value = valStr;
        }
        await this.repo.save(setting);
      }
    }
    return this.getAll();
  }
}
