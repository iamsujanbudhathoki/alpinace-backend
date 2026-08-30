import { In, IsNull } from 'typeorm';
import { autoInjectable } from 'tsyringe';
import { isUUID } from 'class-validator';
import { AppDataSource } from '../../config/database.config';
import { Trek, TrekStatus } from '../../entities/trek/Trek.entity';
import { TripDifficulty } from '../../entities/common/difficulty.enum';
import { TripActivity } from '../../entities/common/activity.enum';
import {
  Category,
  CategoryStatus,
  CategoryType,
} from '../../entities/category/Category.entity';
import { CreateTrekDto, UpdateTrekDto } from '../../schemas/trek.schema';
import { AppError } from '../../utils/appError.util';

import { MediaService } from '../media/media.service';
import { CategoryService } from '../category/category.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditEntityType } from '../../constants/audit.constants';

@autoInjectable()
export class TrekService {
  private repo = AppDataSource.getRepository(Trek);
  private categoryRepo = AppDataSource.getRepository(Category);

  constructor(
    private mediaService: MediaService = new MediaService(),
    private categoryService: CategoryService = new CategoryService(),
    private auditLogService: AuditLogService = new AuditLogService(),
  ) { }

  async getPublicAll(params?: {
    category?: string;
    categorySlug?: string;
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
    return this.getAll({
      ...params,
      isPublic: true,
    });
  }

  async getAdminAll(params?: {
    category?: string;
    categorySlug?: string;
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
    return this.getAll({
      ...params,
      isPublic: false,
    });
  }

  async getAll(params?: {
    category?: string;
    categorySlug?: string;
    categoryId?: string;
    region?: string;
    difficulty?: TripDifficulty;
    status?: TrekStatus;
    isPublic?: boolean;
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

    if (params?.isPublic) {
      qb.andWhere('trek.status IN (:...publicStatuses)', {
        publicStatuses: [TrekStatus.ACTIVE, TrekStatus.FEATURED],
      });
    } else if (params?.status) {
      qb.andWhere('trek.status = :status', { status: params.status });
    }

    const catParam = params?.categorySlug || params?.category || params?.categoryId;
    if (catParam && catParam !== 'All') {
      const isUuid = isUUID(catParam);
      let catEntity: Category | null = null;
      if (isUuid) {
        catEntity = await this.categoryRepo.findOne({ where: { id: catParam } });
      }
      if (!catEntity) {
        catEntity = await this.categoryRepo.findOne({ where: { slug: catParam } });
      }

      if (catEntity) {
        if (catEntity.parentId === null || catEntity.parentId === undefined) {
          // Parent Category: match packages assigned directly to parent category OR to any child subcategories
          const childCats = await this.categoryRepo.find({ where: { parentId: catEntity.id } });
          const childCatIds = childCats.map((c) => c.id);

          if (childCatIds.length > 0) {
            qb.andWhere(
              '(trek.categoryId = :catId OR trek.subcategoryId = :catId OR trek.subcategoryId IN (:...childCatIds))',
              { catId: catEntity.id, childCatIds },
            );
          } else {
            qb.andWhere(
              '(trek.categoryId = :catId OR trek.subcategoryId = :catId)',
              { catId: catEntity.id },
            );
          }
        } else {
          // Subcategory: match ONLY packages belonging to this specific subcategory
          qb.andWhere(
            '(trek.subcategoryId = :subcatId OR (trek.categoryId = :subcatId AND trek.subcategoryId IS NULL))',
            { subcatId: catEntity.id },
          );
        }
      } else {
        qb.andWhere(
          '(trek.categoryId = :catParam OR trek.subcategoryId = :catParam)',
          { catParam },
        );
      }
    }
    if (params?.difficulty && (params.difficulty as any) !== 'All') {
      qb.andWhere('LOWER(trek.difficulty) = LOWER(:difficulty)', {
        difficulty: params.difficulty,
      });
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

    const [items, count] = await qb.getManyAndCount();
    const categories = await this.categoryRepo.find();
    const categoryMap = new Map(categories.map((c) => [c.id, c]));

    const resolved = await Promise.all(
      items.map(async (i) => {
        const withMedia = await this.mediaService.resolveItemMedia(i);
        const cat = i.categoryId ? categoryMap.get(i.categoryId) : undefined;
        const subcat = i.subcategoryId ? categoryMap.get(i.subcategoryId) : undefined;
        return {
          ...withMedia,
          category: cat?.name,
          categorySlug: cat?.slug,
          subcategory: subcat?.name,
          subcategorySlug: subcat?.slug,
        };
      }),
    );
    return [resolved as any, count];
  }

  async getByIdOrSlug(idOrSlug: string): Promise<Trek> {
    const isUuid = isUUID(idOrSlug);

    let item: Trek | null = null;
    if (isUuid) {
      item = await this.repo.findOne({ where: { id: idOrSlug } });
    }
    if (!item) {
      item = await this.repo.findOne({ where: { slug: idOrSlug } });
    }

    if (!item) throw AppError.notFound(`Trek package ${idOrSlug} not found`);
    const withMedia = await this.mediaService.resolveItemMedia(item);
    const cat = item.categoryId
      ? await this.categoryRepo.findOne({ where: { id: item.categoryId } })
      : undefined;
    const subcat = item.subcategoryId
      ? await this.categoryRepo.findOne({ where: { id: item.subcategoryId } })
      : undefined;
    return {
      ...withMedia,
      category: cat?.name,
      categorySlug: cat?.slug,
      subcategory: subcat?.name,
      subcategorySlug: subcat?.slug,
    } as any;
  }

  async getPublicByIdOrSlug(idOrSlug: string): Promise<Trek> {
    const item = await this.getByIdOrSlug(idOrSlug);
    if (item.status !== TrekStatus.ACTIVE && item.status !== TrekStatus.FEATURED) {
      throw AppError.notFound(`Trek package ${idOrSlug} not found`);
    }
    return item;
  }

  async create(dto: CreateTrekDto): Promise<Trek> {
    let slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await this.repo.findOne({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    await this.categoryService.validateResourceCategory(
      CategoryType.TREKKING,
      dto.categoryId,
      dto.subcategoryId,
    );

    await this.mediaService.validateMediaIdsExists([
      dto.coverMediaId,
      dto.mapMediaId,
      ...(dto.galleryMediaIds || []),
    ]);

    const trek = this.repo.create({
      title: dto.title,
      slug,
      categoryId: dto.categoryId,
      subcategoryId: dto.subcategoryId || null,
      region: dto.region,
      durationDays: Number(dto.durationDays),
      maxAltitudeMeters: Number(dto.maxAltitudeMeters) || 1400,
      difficulty: dto.difficulty || TripDifficulty.MODERATE,
      priceUSD: Number(dto.priceUSD),
      status: dto.status || TrekStatus.ACTIVE,
      shortDesc: dto.shortDesc,
      coverMediaId: dto.coverMediaId,
      country: dto.country || 'Nepal',
      activity: dto.activity || TripActivity.TREKKING_HIKING,
      bestSeason: dto.bestSeason,
      startEndLocation: dto.startEndLocation,
      accommodation: dto.accommodation,
      meals: dto.meals,
      groupSizeRange: dto.groupSizeRange,
      inclusionsText: dto.inclusionsText,
      exclusionsText: dto.exclusionsText,
      itinerary: dto.itinerary || [],
      faqs: dto.faqs || [],
      reviews: dto.reviews || [],
      addonsText: dto.addonsText,
      usefulInfoText: dto.usefulInfoText,
      departureDates: dto.departureDates || [],
      galleryMediaIds: dto.galleryMediaIds || [],
      mapMediaId: dto.mapMediaId,
      packageFiles: dto.packageFiles || [],
      metaTitle: dto.metaTitle,
      metaDescription: dto.metaDescription,
      keywords: dto.keywords,
      rating: 5.0,
      reviewsCount: 0,
      totalBookings: 0,
    } as Partial<Trek>);

    const saved = await this.repo.save(trek);
    await this.auditLogService.logCreate(AuditEntityType.TREK, saved.id, saved);
    return this.mediaService.resolveItemMedia(saved);
  }

  async update(id: string, dto: UpdateTrekDto): Promise<Trek> {
    await this.mediaService.validateMediaIdsExists([
      dto.coverMediaId,
      dto.mapMediaId,
      ...(dto.galleryMediaIds || []),
    ]);

    const trek = await this.getByIdOrSlug(id);
    const oldState = { ...trek };

    const targetCategoryId =
      dto.categoryId !== undefined ? dto.categoryId : trek.categoryId;
    const targetSubcategoryId =
      dto.subcategoryId !== undefined ? dto.subcategoryId : trek.subcategoryId;

    await this.categoryService.validateResourceCategory(
      CategoryType.TREKKING,
      targetCategoryId,
      targetSubcategoryId,
    );

    if (dto.title && dto.title !== trek.title) {
      trek.title = dto.title;
      trek.slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (dto.categoryId !== undefined) {
      trek.categoryId = dto.categoryId;
    }
    if (dto.subcategoryId !== undefined) {
      trek.subcategoryId = dto.subcategoryId || null;
    }
    if (dto.region) trek.region = dto.region;
    if (dto.durationDays !== undefined)
      trek.durationDays = Number(dto.durationDays);
    if (dto.maxAltitudeMeters !== undefined)
      trek.maxAltitudeMeters = Number(dto.maxAltitudeMeters);
    if (dto.difficulty) trek.difficulty = dto.difficulty;
    if (dto.priceUSD !== undefined) trek.priceUSD = Number(dto.priceUSD);
    if (dto.status) trek.status = dto.status;
    if (dto.shortDesc !== undefined) trek.shortDesc = dto.shortDesc;
    if (dto.coverMediaId !== undefined) trek.coverMediaId = dto.coverMediaId;
    if (dto.country !== undefined) trek.country = dto.country;
    if (dto.activity !== undefined) trek.activity = dto.activity;
    if (dto.bestSeason !== undefined) trek.bestSeason = dto.bestSeason;
    if (dto.startEndLocation !== undefined)
      trek.startEndLocation = dto.startEndLocation;
    if (dto.accommodation !== undefined) trek.accommodation = dto.accommodation;
    if (dto.meals !== undefined) trek.meals = dto.meals;
    if (dto.groupSizeRange !== undefined)
      trek.groupSizeRange = dto.groupSizeRange;
    if (dto.inclusionsText !== undefined)
      trek.inclusionsText = dto.inclusionsText;
    if (dto.exclusionsText !== undefined)
      trek.exclusionsText = dto.exclusionsText;
    if (dto.itinerary !== undefined) trek.itinerary = dto.itinerary;
    if (dto.faqs !== undefined) trek.faqs = dto.faqs;
    if (dto.reviews !== undefined) trek.reviews = dto.reviews;
    if (dto.addonsText !== undefined) trek.addonsText = dto.addonsText;
    if (dto.usefulInfoText !== undefined) trek.usefulInfoText = dto.usefulInfoText;
    if (dto.departureDates !== undefined) trek.departureDates = dto.departureDates;
    if (dto.galleryMediaIds !== undefined) trek.galleryMediaIds = dto.galleryMediaIds;
    if (dto.mapMediaId !== undefined) trek.mapMediaId = dto.mapMediaId;
    if (dto.packageFiles !== undefined) trek.packageFiles = dto.packageFiles;
    if (dto.metaTitle !== undefined) trek.metaTitle = dto.metaTitle;
    if (dto.metaDescription !== undefined)
      trek.metaDescription = dto.metaDescription;
    if (dto.keywords !== undefined) trek.keywords = dto.keywords;

    const saved = await this.repo.save(trek);
    await this.auditLogService.logUpdate(AuditEntityType.TREK, saved.id, oldState, saved);

    return this.mediaService.resolveItemMedia(saved);
  }

  async delete(id: string): Promise<boolean> {
    const trek = await this.getByIdOrSlug(id);
    const oldState = { ...trek };
    await this.repo.remove(trek);
    await this.auditLogService.logDelete(AuditEntityType.TREK, id, oldState);
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

    const dbCategories = await this.categoryRepo.find({
      where: { type: CategoryType.TREKKING, status: CategoryStatus.ACTIVE, parentId: IsNull() },
      order: { menuOrder: 'ASC', createdAt: 'DESC' },
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
        value: c.slug || c.id,
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
