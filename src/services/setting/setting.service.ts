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
      siteName: 'Alpine Ace Expeditions',
      contactEmail: 'expeditions@alpineace.com',
      contactPhone: '+977 1 4545890',
      companyAddress: 'Thamel, Kathmandu, Nepal',
      metaTitle: 'Alpine Ace | Premium Himalayan Expeditions & Luxury Treks',
      metaDescription:
        'Leading high-altitude expedition operator in Nepal specializing in 8000m peaks, Everest Base Camp luxury lodge treks, and bespoke cultural tours.',
      enableBookings: 'true',
      currency: 'USD',
    };

    settings.forEach((s) => {
      map[s.key] = s.value;
    });

    return map;
  }

  async update(dto: UpdateSettingsDto): Promise<Record<string, string>> {
    for (const [key, value] of Object.entries(dto)) {
      let setting = await this.repo.findOne({ where: { key } });
      if (!setting) {
        setting = this.repo.create({ key, value: String(value) });
      } else {
        setting.value = String(value);
      }
      await this.repo.save(setting);
    }
    return this.getAll();
  }
}
