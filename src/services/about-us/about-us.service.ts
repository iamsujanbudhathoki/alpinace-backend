import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { AboutUs, AboutUsStatus } from '../../entities/about-us/AboutUs.entity';
import { UpdateAboutUsDto } from '../../schemas/about-us.schema';
import { MediaService } from '../media/media.service';

@autoInjectable()
export class AboutUsService {
  private aboutUsRepository = AppDataSource.getRepository(AboutUs);

  constructor(private mediaService: MediaService = new MediaService()) {}

  private DEFAULT_ABOUT_US: Partial<AboutUs> = {
    heroTitle: 'Sherpa-guided treks planned from Kathmandu.',
    heroSubtitle:
      'AlpineAce was founded in Thamel in 2012 with a clear commitment: deliver high-altitude Himalayan expeditions that combine certified mountain guides with safety logistics and authentic local hospitality.',
    heroImage:
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1600',
    storyTitle: 'Twelve years of guided expeditions',
    storyContent:
      '<p>When we started, most operators in Nepal were either budget teahouse companies or foreign-owned luxury brands that subcontracted local guides. Neither worked well for serious travelers who wanted both comfort and real local knowledge.</p><p>We built AlpineAce around a direct model: Sherpa guides who lead every expedition, long-standing mountain lodge partnerships, and clear safety protocols. The result is a company focused entirely on trip quality and trekker safety.</p>',
    storyImage:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800',
    mission:
      '<p>To empower local Sherpa communities through sustainable, ethically managed Himalayan adventures while providing world-class safety standards for international trekkers.</p>',
    vision:
      '<p>To be the premier Sherpa-owned expedition operator recognized globally for high-altitude safety, local empowerment, and authentic Himalayan experiences.</p>',
    values: [
      {
        title: 'Sherpa-owned and operated',
        desc: '100% of our leadership and field staff are local Sherpas. Profits from every expedition go back into Sherpa villages — supporting schools, solar infrastructure, and micro-hydro projects.',
      },
      {
        title: 'Environmental responsibility',
        desc: 'All waste is packed out from campsites. We cook with LPG gas instead of firewood, and apply carbon offsets to helicopter flights. Porters are paid fair wages that exceed industry standards.',
      },
      {
        title: 'Quality over volume',
        desc: 'We run a maximum of 30 expeditions per year. That limit exists so we can maintain genuine standards on guide prep, equipment quality, kitchen hygiene, and client communication.',
      },
    ],
    stats: [
      { number: '100%', label: 'Sherpa owned & operated' },
      { number: '25+', label: 'Active IFMGA guides' },
    ],
    status: AboutUsStatus.PUBLISHED,
    metaTitle: 'About AlpineAce | Our Team, Sherpa Heritage & Values',
    metaDescription:
      'AlpineAce is a Sherpa-owned trekking and expedition company based in Thamel, Kathmandu. Founded in 2012 to combine local Sherpa expertise with international safety standards.',
    metaKeywords:
      'About AlpineAce, Sherpa owned trek company, Kathmandu trekking agency, IFMGA Sherpa guides, Himalayan trekking team',
  };

  async get(): Promise<AboutUs> {
    const [about] = await this.aboutUsRepository.find({
      order: { createdAt: 'ASC' },
      take: 1,
    });
    if (!about) {
      const newAbout = this.aboutUsRepository.create(this.DEFAULT_ABOUT_US);
      const saved = await this.aboutUsRepository.save(newAbout);
      return this.mediaService.resolveItemMedia(saved);
    }
    return this.mediaService.resolveItemMedia(about);
  }

  async getPublic(): Promise<AboutUs> {
    const about = await this.get();
    return about;
  }

  async update(dto: UpdateAboutUsDto): Promise<AboutUs> {
    if (dto.heroMediaId) {
      await this.mediaService.validateMediaExists(dto.heroMediaId);
    }
    if (dto.storyMediaId) {
      await this.mediaService.validateMediaExists(dto.storyMediaId);
    }

    const [existing] = await this.aboutUsRepository.find({
      order: { createdAt: 'ASC' },
      take: 1,
    });
    let about: AboutUs;
    if (!existing) {
      about = this.aboutUsRepository.create({
        ...this.DEFAULT_ABOUT_US,
        ...dto,
      });
    } else {
      about = this.aboutUsRepository.merge(existing, dto);
    }
    const saved = await this.aboutUsRepository.save(about);
    return this.mediaService.resolveItemMedia(saved);
  }
}
