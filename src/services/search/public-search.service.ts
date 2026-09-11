import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Trek, TrekStatus } from '../../entities/trek/Trek.entity';
import { Tour, TourStatus } from '../../entities/tour/Tour.entity';
import { Expedition, ExpeditionStatus } from '../../entities/expedition/Expedition.entity';
import { BlogArticle, BlogStatus } from '../../entities/blog/BlogArticle.entity';
import {
  PublicSearchResponseDto,
  PublicSearchResultItemDto,
  PublicSearchType,
} from '../../dtos/public-search.dto';
import { MediaService } from '../media/media.service';

export interface PublicSearchParams {
  query?: string;
  type?: PublicSearchType | string;
  limit?: number;
}

@autoInjectable()
export class PublicSearchService {
  private trekRepo = AppDataSource.getRepository(Trek);
  private tourRepo = AppDataSource.getRepository(Tour);
  private expeditionRepo = AppDataSource.getRepository(Expedition);
  private blogRepo = AppDataSource.getRepository(BlogArticle);

  constructor(private mediaService: MediaService = new MediaService()) {}

  async search(params: PublicSearchParams): Promise<PublicSearchResponseDto> {
    const q = (params.query || '').trim();
    const typeFilter = (params.type as PublicSearchType) || PublicSearchType.ALL;
    const limitNum = params.limit && params.limit > 0 ? Math.min(params.limit, 50) : 10;

    if (!q || q.length < 2) {
      return { query: q, totalResults: 0, results: [] };
    }

    const pattern = `%${q.toLowerCase()}%`;

    const [treks, tours, expeditions, blogs] = await Promise.all([
      // Treks (Active)
      typeFilter === PublicSearchType.ALL || typeFilter === PublicSearchType.TREK
        ? this.trekRepo
            .createQueryBuilder('t')
            .where('t.status = :activeStatus', {
              activeStatus: TrekStatus.ACTIVE,
            })
            .andWhere(
              '(LOWER(t.title) LIKE :pattern OR LOWER(t.region) LIKE :pattern OR LOWER(t.slug) LIKE :pattern)',
              { pattern },
            )
            .take(limitNum)
            .getMany()
        : Promise.resolve([]),

      // Tours (Active)
      typeFilter === PublicSearchType.ALL || typeFilter === PublicSearchType.TOUR
        ? this.tourRepo
            .createQueryBuilder('t')
            .where('t.status = :activeStatus', {
              activeStatus: TourStatus.ACTIVE,
            })
            .andWhere(
              '(LOWER(t.title) LIKE :pattern OR LOWER(t.region) LIKE :pattern OR LOWER(t.slug) LIKE :pattern)',
              { pattern },
            )
            .take(limitNum)
            .getMany()
        : Promise.resolve([]),

      // Expeditions (Active)
      typeFilter === PublicSearchType.ALL || typeFilter === PublicSearchType.EXPEDITION
        ? this.expeditionRepo
            .createQueryBuilder('e')
            .where('e.status = :activeStatus', {
              activeStatus: ExpeditionStatus.ACTIVE,
            })
            .andWhere(
              '(LOWER(e.title) LIKE :pattern OR LOWER(e.region) LIKE :pattern OR LOWER(e.slug) LIKE :pattern)',
              { pattern },
            )
            .take(limitNum)
            .getMany()
        : Promise.resolve([]),

      // Blogs (Published)
      typeFilter === PublicSearchType.ALL || typeFilter === PublicSearchType.BLOG
        ? this.blogRepo
            .createQueryBuilder('b')
            .where('b.status = :publishedStatus', {
              publishedStatus: BlogStatus.PUBLISHED,
            })
            .andWhere(
              '(LOWER(b.title) LIKE :pattern OR LOWER(b.category) LIKE :pattern OR LOWER(b.slug) LIKE :pattern)',
              { pattern },
            )
            .take(limitNum)
            .getMany()
        : Promise.resolve([]),
    ]);

    // Resolve media URLs for items
    const [resolvedTreks, resolvedTours, resolvedExpeditions, resolvedBlogs] = await Promise.all([
      Promise.all(treks.map((item) => this.mediaService.resolveItemMedia(item))),
      Promise.all(tours.map((item) => this.mediaService.resolveItemMedia(item))),
      Promise.all(expeditions.map((item) => this.mediaService.resolveItemMedia(item))),
      Promise.all(blogs.map((item) => this.mediaService.resolveItemMedia(item))),
    ]);

    const results: PublicSearchResultItemDto[] = [
      ...resolvedTreks.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        type: PublicSearchType.TREK,
        category: (item as any).category || undefined,
        region: item.region,
        durationDays: item.durationDays,
        priceUSD: item.priceUSD ? Number(item.priceUSD) : undefined,
        difficulty: item.difficulty,
        image: item.image,
      })),

      ...resolvedTours.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        type: PublicSearchType.TOUR,
        category: (item as any).category || undefined,
        region: item.region,
        durationDays: item.durationDays,
        priceUSD: item.priceUSD ? Number(item.priceUSD) : undefined,
        difficulty: item.difficulty,
        image: item.image,
      })),

      ...resolvedExpeditions.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        type: PublicSearchType.EXPEDITION,
        category: (item as any).category || undefined,
        region: item.region,
        durationDays: item.durationDays,
        priceUSD: item.priceUSD ? Number(item.priceUSD) : undefined,
        difficulty: item.difficulty,
        image: item.image,
      })),

      ...resolvedBlogs.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        type: PublicSearchType.BLOG,
        category: item.category,
        image: item.image,
      })),
    ];

    const slicedResults = results.slice(0, limitNum);

    return {
      query: q,
      totalResults: slicedResults.length,
      results: slicedResults,
    };
  }
}
