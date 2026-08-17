import { In } from 'typeorm';
import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Trek, TrekStatus } from '../../entities/trek/Trek.entity';
import { TripDifficulty } from '../../entities/common/difficulty.enum';
import {
  Category,
  CategoryType,
} from '../../entities/category/Category.entity';
import { CreateTrekDto, UpdateTrekDto } from '../../schemas/trek.schema';
import { AppError } from '../../utils/appError.util';

@autoInjectable()
export class TrekService {
  private repo = AppDataSource.getRepository(Trek);
  private categoryRepo = AppDataSource.getRepository(Category);

  async getAll(params?: {
    categoryId?: string;
    region?: string;
    difficulty?: TripDifficulty;
    status?: TrekStatus;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minDuration?: number;
    maxDuration?: number;
    minAltitude?: number;
    maxAltitude?: number;
    sortBy?: string;
    limit?: number;
    page?: number;
  }): Promise<[Trek[], number]> {
    const qb = this.repo.createQueryBuilder('trek');

    if (params?.categoryId && params.categoryId !== 'All') {
      qb.andWhere('trek.categoryId = :categoryId', {
        categoryId: params.categoryId,
      });
    }
    if (params?.region && params.region !== 'All') {
      qb.andWhere('LOWER(trek.region) = LOWER(:region)', {
        region: params.region,
      });
    }
    if (params?.difficulty && (params.difficulty as any) !== 'All') {
      qb.andWhere('LOWER(trek.difficulty) = LOWER(:difficulty)', {
        difficulty: params.difficulty,
      });
    }
    if (params?.status) {
      qb.andWhere('trek.status = :status', { status: params.status });
    }
    if (params?.search && params.search.trim()) {
      qb.andWhere(
        '(LOWER(trek.title) LIKE :search OR LOWER(trek.shortDesc) LIKE :search OR LOWER(trek.region) LIKE :search OR LOWER(trek.difficulty) LIKE :search OR LOWER(trek.startEndLocation) LIKE :search)',
        {
          search: `%${params.search.trim().toLowerCase()}%`,
        },
      );
    }
    if (params?.minPrice !== undefined && Number(params.minPrice) > 0) {
      qb.andWhere('trek.priceUSD >= :minPrice', {
        minPrice: Number(params.minPrice),
      });
    }
    if (params?.maxPrice !== undefined && Number(params.maxPrice) > 0) {
      qb.andWhere('trek.priceUSD <= :maxPrice', {
        maxPrice: Number(params.maxPrice),
      });
    }
    if (params?.minDuration !== undefined && Number(params.minDuration) > 0) {
      qb.andWhere('trek.durationDays >= :minDuration', {
        minDuration: Number(params.minDuration),
      });
    }
    if (params?.maxDuration !== undefined && Number(params.maxDuration) > 0) {
      qb.andWhere('trek.durationDays <= :maxDuration', {
        maxDuration: Number(params.maxDuration),
      });
    }
    if (params?.minAltitude !== undefined && Number(params.minAltitude) > 0) {
      qb.andWhere('trek.maxAltitudeMeters >= :minAltitude', {
        minAltitude: Number(params.minAltitude),
      });
    }
    if (params?.maxAltitude !== undefined && Number(params.maxAltitude) > 0) {
      qb.andWhere('trek.maxAltitudeMeters <= :maxAltitude', {
        maxAltitude: Number(params.maxAltitude),
      });
    }

    switch (params?.sortBy) {
      case 'rating':
        qb.orderBy('trek.rating', 'DESC').addOrderBy(
          'trek.reviewsCount',
          'DESC',
        );
        break;
      case 'price-low':
        qb.orderBy('trek.priceUSD', 'ASC');
        break;
      case 'price-high':
        qb.orderBy('trek.priceUSD', 'DESC');
        break;
      case 'duration':
        qb.orderBy('trek.durationDays', 'ASC');
        break;
      case 'altitude':
        qb.orderBy('trek.maxAltitudeMeters', 'DESC');
        break;
      case 'newest':
      default:
        qb.orderBy('trek.createdAt', 'DESC');
        break;
    }

    if (params?.limit) {
      qb.take(params.limit);
      if (params.page && params.page > 1) {
        qb.skip((params.page - 1) * params.limit);
      }
    }

    return qb.getManyAndCount();
  }

  async getByIdOrSlug(idOrSlug: string): Promise<Trek> {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        idOrSlug,
      );

    let item: Trek | null = null;
    if (isUuid) {
      item = await this.repo.findOne({ where: { id: idOrSlug } });
    }
    if (!item) {
      item = await this.repo.findOne({ where: { slug: idOrSlug } });
    }

    if (!item) throw AppError.notFound(`Trek package ${idOrSlug} not found`);
    return item;
  }

  async create(dto: CreateTrekDto): Promise<Trek> {
    let slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await this.repo.findOne({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    let categoryId = dto.categoryId;
    if (categoryId) {
      const cat = await this.categoryRepo.findOne({
        where: { id: categoryId },
      });
      if (!cat) categoryId = undefined;
    }

    const permitsArray = dto.permitsRequired
      ? dto.permitsRequired
      : dto.permitsText
        ? dto.permitsText
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const trek = this.repo.create({
      title: dto.title,
      slug,
      categoryId,
      region: dto.region,
      durationDays: Number(dto.durationDays),
      maxAltitudeMeters: Number(dto.maxAltitudeMeters) || 1400,
      difficulty: dto.difficulty || TripDifficulty.MODERATE,
      priceUSD: Number(dto.priceUSD),
      status: dto.status || TrekStatus.ACTIVE,
      shortDesc: dto.shortDesc,
      image: dto.image,
      bestSeason: dto.bestSeason,
      startEndLocation: dto.startEndLocation,
      accommodation: dto.accommodation,
      meals: dto.meals,
      groupSizeRange: dto.groupSizeRange,
      permitsRequired: permitsArray,
      inclusionsText: dto.inclusionsText,
      exclusionsText: dto.exclusionsText,
      itinerary: dto.itinerary || [],
      faqs: dto.faqs || [],
      reviews: dto.reviews || [],
      metaTitle: dto.metaTitle,
      metaDescription: dto.metaDescription,
      keywords: dto.keywords,
      rating: 5.0,
      reviewsCount: 0,
      totalBookings: 0,
    } as Partial<Trek>);

    return this.repo.save(trek);
  }

  async update(id: string, dto: UpdateTrekDto): Promise<Trek> {
    const trek = await this.getByIdOrSlug(id);

    if (dto.title && dto.title !== trek.title) {
      trek.title = dto.title;
      trek.slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (dto.categoryId !== undefined) {
      trek.categoryId = dto.categoryId;
    }
    if (dto.region) trek.region = dto.region;
    if (dto.durationDays !== undefined)
      trek.durationDays = Number(dto.durationDays);
    if (dto.maxAltitudeMeters !== undefined)
      trek.maxAltitudeMeters = Number(dto.maxAltitudeMeters);
    if (dto.difficulty) trek.difficulty = dto.difficulty;
    if (dto.priceUSD !== undefined) trek.priceUSD = Number(dto.priceUSD);
    if (dto.status) trek.status = dto.status;
    if (dto.shortDesc) trek.shortDesc = dto.shortDesc;
    if (dto.image) trek.image = dto.image;
    if (dto.bestSeason !== undefined) trek.bestSeason = dto.bestSeason;
    if (dto.startEndLocation !== undefined)
      trek.startEndLocation = dto.startEndLocation;
    if (dto.accommodation !== undefined) trek.accommodation = dto.accommodation;
    if (dto.meals !== undefined) trek.meals = dto.meals;
    if (dto.groupSizeRange !== undefined)
      trek.groupSizeRange = dto.groupSizeRange;
    if (dto.permitsRequired) {
      trek.permitsRequired = dto.permitsRequired;
    } else if (dto.permitsText !== undefined) {
      trek.permitsRequired = dto.permitsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (dto.inclusionsText !== undefined)
      trek.inclusionsText = dto.inclusionsText;
    if (dto.exclusionsText !== undefined)
      trek.exclusionsText = dto.exclusionsText;
    if (dto.itinerary !== undefined) trek.itinerary = dto.itinerary;
    if (dto.faqs !== undefined) trek.faqs = dto.faqs;
    if (dto.reviews !== undefined) trek.reviews = dto.reviews;
    if (dto.metaTitle !== undefined) trek.metaTitle = dto.metaTitle;
    if (dto.metaDescription !== undefined)
      trek.metaDescription = dto.metaDescription;
    if (dto.keywords !== undefined) trek.keywords = dto.keywords;

    return this.repo.save(trek);
  }

  async delete(id: string): Promise<boolean> {
    const trek = await this.getByIdOrSlug(id);
    await this.repo.remove(trek);
    return true;
  }

  async getFilterOptions(): Promise<{
    categories: {
      label: string;
      value: string;
      id?: string;
      name?: string;
      slug?: string;
    }[];
    difficulties: { label: string; value: string }[];
    regions: { label: string; value: string }[];
    sortOptions: { label: string; value: string }[];
    minDuration: number;
    maxDuration: number;
    minPrice: number;
    maxPrice: number;
    minAltitude: number;
    maxAltitude: number;
  }> {
    const treks = await this.repo.find();

    const categoryIds = Array.from(
      new Set(
        treks
          .map((p) => p.categoryId)
          .filter((id): id is string => Boolean(id)),
      ),
    );
    const dbCategories =
      categoryIds.length > 0
        ? await this.categoryRepo.find({ where: { id: In(categoryIds) } })
        : await this.categoryRepo.find({
            where: { type: CategoryType.TREKKING },
          });

    const durations = treks
      .map((p) => Number(p.durationDays))
      .filter((d) => !isNaN(d) && d > 0);
    const prices = treks
      .map((p) => Number(p.priceUSD))
      .filter((pr) => !isNaN(pr) && pr > 0);
    const altitudes = treks
      .map((p) => Number(p.maxAltitudeMeters))
      .filter((a) => !isNaN(a) && a > 0);

    const minDuration = durations.length > 0 ? Math.min(...durations) : 1;
    const maxDuration = durations.length > 0 ? Math.max(...durations) : 30;
    const minPrice = prices.length > 0 ? Math.min(...prices) : 100;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 10000;
    const minAltitude = altitudes.length > 0 ? Math.min(...altitudes) : 1400;
    const maxAltitude = altitudes.length > 0 ? Math.max(...altitudes) : 8848;

    const categories = [
      { label: 'All Categories', value: 'All' },
      ...dbCategories.map((c) => ({
        label: c.name,
        value: c.id,
        id: c.id,
        name: c.name,
        slug: c.slug,
      })),
    ];

    const regions = [
      { label: 'All Regions', value: 'All' },
      { label: 'Everest Region', value: 'Everest' },
      { label: 'Annapurna Region', value: 'Annapurna' },
      { label: 'Manaslu Region', value: 'Manaslu' },
      { label: 'Langtang Region', value: 'Langtang' },
      { label: 'Mustang Region', value: 'Mustang' },
      { label: 'Dolpo Region', value: 'Dolpo' },
      { label: 'Kanchanjunga Region', value: 'Kanchanjunga' },
    ];

    const difficulties = [
      { label: 'All Grades', value: 'All' },
      { label: 'Easy (Introductory)', value: TripDifficulty.EASY },
      { label: 'Moderate (Alpine)', value: TripDifficulty.MODERATE },
      { label: 'Challenging (High Pass)', value: TripDifficulty.CHALLENGING },
      { label: 'Strenuous / Extreme', value: TripDifficulty.STRENUOUS },
    ];

    const sortOptions = [
      { label: 'Featured / Newest', value: 'newest' },
      { label: 'Top Rated', value: 'rating' },
      { label: 'Price: Low to High', value: 'price-low' },
      { label: 'Price: High to Low', value: 'price-high' },
      { label: 'Duration: Short to Long', value: 'duration' },
      { label: 'Max Altitude', value: 'altitude' },
    ];

    return {
      categories,
      difficulties,
      regions,
      sortOptions,
      minDuration,
      maxDuration,
      minPrice,
      maxPrice,
      minAltitude,
      maxAltitude,
    };
  }
}
