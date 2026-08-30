import { In, IsNull } from 'typeorm';
import { autoInjectable } from 'tsyringe';
import { isUUID } from 'class-validator';
import { AppDataSource } from '../../config/database.config';
import {
  ClimbingGrade,
  Expedition,
  ExpeditionStatus,
} from '../../entities/expedition/Expedition.entity';
import { TripDifficulty } from '../../entities/common/difficulty.enum';
import { TripActivity } from '../../entities/common/activity.enum';
import {
  Category,
  CategoryStatus,
  CategoryType,
} from '../../entities/category/Category.entity';
import {
  CreateExpeditionDto,
  UpdateExpeditionDto,
} from '../../schemas/expedition.schema';
import { AppError } from '../../utils/appError.util';

import { MediaService } from '../media/media.service';
import { CategoryService } from '../category/category.service';

@autoInjectable()
export class ExpeditionService {
  private repo = AppDataSource.getRepository(Expedition);
  private categoryRepo = AppDataSource.getRepository(Category);

  constructor(
    private mediaService: MediaService = new MediaService(),
    private categoryService: CategoryService = new CategoryService(),
  ) { }

  async getPublicAll(params?: {
    category?: string;
    categorySlug?: string;
    categoryId?: string;
    region?: string;
    difficulty?: TripDifficulty;
    climbingGrade?: ClimbingGrade;
    status?: ExpeditionStatus;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minAltitude?: number;
    maxAltitude?: number;
    minPeakHeight?: number;
    maxPeakHeight?: number;
    sortBy?: string;
    limit?: number;
    page?: number;
  }): Promise<[Expedition[], number]> {
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
    climbingGrade?: ClimbingGrade;
    status?: ExpeditionStatus;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minAltitude?: number;
    maxAltitude?: number;
    minPeakHeight?: number;
    maxPeakHeight?: number;
    sortBy?: string;
    limit?: number;
    page?: number;
  }): Promise<[Expedition[], number]> {
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
    climbingGrade?: ClimbingGrade;
    status?: ExpeditionStatus;
    isPublic?: boolean;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minAltitude?: number;
    maxAltitude?: number;
    minPeakHeight?: number;
    maxPeakHeight?: number;
    sortBy?: string;
    limit?: number;
    page?: number;
  }): Promise<[Expedition[], number]> {
    await this.autoLinkCategories();
    const qb = this.repo.createQueryBuilder('exp');

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
              '(exp.categoryId = :catId OR exp.subcategoryId = :catId OR exp.subcategoryId IN (:...childCatIds))',
              { catId: catEntity.id, childCatIds },
            );
          } else {
            qb.andWhere(
              '(exp.categoryId = :catId OR exp.subcategoryId = :catId)',
              { catId: catEntity.id },
            );
          }
        } else {
          // Subcategory: match ONLY packages belonging to this specific subcategory
          qb.andWhere(
            '(exp.subcategoryId = :subcatId OR (exp.categoryId = :subcatId AND exp.subcategoryId IS NULL))',
            { subcatId: catEntity.id },
          );
        }
      } else {
        qb.andWhere(
          '(exp.categoryId = :catParam OR exp.subcategoryId = :catParam)',
          { catParam },
        );
      }
    }
    if (params?.region && params.region !== 'All') {
      qb.andWhere('LOWER(exp.region) = LOWER(:region)', {
        region: params.region,
      });
    }
    if (params?.difficulty && (params.difficulty as any) !== 'All') {
      qb.andWhere('LOWER(exp.difficulty) = LOWER(:difficulty)', {
        difficulty: params.difficulty,
      });
    }
    if (params?.climbingGrade && (params.climbingGrade as any) !== 'All') {
      qb.andWhere('LOWER(exp.climbingGrade) = LOWER(:climbingGrade)', {
        climbingGrade: params.climbingGrade,
      });
    }
    if (params?.isPublic) {
      qb.andWhere('exp.status IN (:...publicStatuses)', {
        publicStatuses: [ExpeditionStatus.ACTIVE, ExpeditionStatus.FEATURED],
      });
    } else if (params?.status) {
      qb.andWhere('exp.status = :status', { status: params.status });
    }
    if (params?.search && params.search.trim()) {
      qb.andWhere(
        '(LOWER(exp.title) LIKE :search OR LOWER(exp.shortDesc) LIKE :search OR LOWER(exp.region) LIKE :search OR LOWER(exp.climbingGrade) LIKE :search)',
        {
          search: `%${params.search.trim().toLowerCase()}%`,
        },
      );
    }
    if (params?.minPrice !== undefined && Number(params.minPrice) > 0) {
      qb.andWhere('exp.priceUSD >= :minPrice', {
        minPrice: Number(params.minPrice),
      });
    }
    if (params?.maxPrice !== undefined && Number(params.maxPrice) > 0) {
      qb.andWhere('exp.priceUSD <= :maxPrice', {
        maxPrice: Number(params.maxPrice),
      });
    }
    if (params?.minAltitude !== undefined && Number(params.minAltitude) > 0) {
      qb.andWhere('exp.maxAltitudeMeters >= :minAltitude', {
        minAltitude: Number(params.minAltitude),
      });
    }
    if (params?.maxAltitude !== undefined && Number(params.maxAltitude) > 0) {
      qb.andWhere('exp.maxAltitudeMeters <= :maxAltitude', {
        maxAltitude: Number(params.maxAltitude),
      });
    }
    if (
      params?.minPeakHeight !== undefined &&
      Number(params.minPeakHeight) > 0
    ) {
      qb.andWhere('exp.peakHeightM >= :minPeakHeight', {
        minPeakHeight: Number(params.minPeakHeight),
      });
    }
    if (
      params?.maxPeakHeight !== undefined &&
      Number(params.maxPeakHeight) > 0
    ) {
      qb.andWhere('exp.peakHeightM <= :maxPeakHeight', {
        maxPeakHeight: Number(params.maxPeakHeight),
      });
    }

    switch (params?.sortBy) {
      case 'rating':
        qb.orderBy('exp.rating', 'DESC').addOrderBy('exp.reviewsCount', 'DESC');
        break;
      case 'price-low':
        qb.orderBy('exp.priceUSD', 'ASC');
        break;
      case 'price-high':
        qb.orderBy('exp.priceUSD', 'DESC');
        break;
      case 'altitude':
      case 'peak-height':
        qb.orderBy('exp.peakHeightM', 'DESC');
        break;
      case 'duration':
        qb.orderBy('exp.durationDays', 'ASC');
        break;
      case 'newest':
      default:
        qb.orderBy('exp.createdAt', 'DESC');
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

  async getByIdOrSlug(idOrSlug: string): Promise<Expedition> {
    const isUuid = isUUID(idOrSlug);

    let item: Expedition | null = null;
    if (isUuid) {
      item = await this.repo.findOne({ where: { id: idOrSlug } });
    }
    if (!item) {
      item = await this.repo.findOne({ where: { slug: idOrSlug } });
    }

    if (!item)
      throw AppError.notFound(`Expedition package ${idOrSlug} not found`);
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

  async getPublicByIdOrSlug(idOrSlug: string): Promise<Expedition> {
    const item = await this.getByIdOrSlug(idOrSlug);
    if (item.status !== ExpeditionStatus.ACTIVE && item.status !== ExpeditionStatus.FEATURED) {
      throw AppError.notFound(`Expedition package ${idOrSlug} not found`);
    }
    return item;
  }

  async create(dto: CreateExpeditionDto): Promise<Expedition> {
    await this.categoryService.validateResourceCategory(
      CategoryType.EXPEDITIONS,
      dto.categoryId,
      dto.subcategoryId,
    );

    await this.mediaService.validateMediaIdsExists([
      dto.coverMediaId,
      dto.mapMediaId,
      ...(dto.galleryMediaIds || []),
    ]);

    let slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await this.repo.findOne({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const altitude =
      dto.peakHeightM !== undefined
        ? Number(dto.peakHeightM)
        : dto.maxAltitudeMeters !== undefined
          ? Number(dto.maxAltitudeMeters)
          : 6000;

    const exp = this.repo.create({
      title: dto.title,
      slug,
      categoryId: dto.categoryId,
      subcategoryId: dto.subcategoryId || null,
      region: dto.region,
      durationDays: Number(dto.durationDays),
      peakHeightM: altitude,
      maxAltitudeMeters: altitude,
      climbingGrade: dto.climbingGrade || ClimbingGrade.EXTREME_TECHNICAL_GRADE,
      difficulty: dto.difficulty || TripDifficulty.EXTREME,
      sherpaGuideRatio: dto.sherpaGuideRatio || '1:1 Sherpa Guide Ratio',
      oxygenRequired:
        dto.oxygenRequired !== undefined ? dto.oxygenRequired : true,
      priceUSD: Number(dto.priceUSD),
      status: dto.status || ExpeditionStatus.ACTIVE,
      shortDesc: dto.shortDesc,
      coverMediaId: dto.coverMediaId,
      country: dto.country || 'Nepal',
      activity: dto.activity || TripActivity.PEAK_CLIMBING,
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
    } as Partial<Expedition>);

    const saved = await this.repo.save(exp);
    return this.mediaService.resolveItemMedia(saved);
  }

  async update(id: string, dto: UpdateExpeditionDto): Promise<Expedition> {
    await this.mediaService.validateMediaIdsExists([
      dto.coverMediaId,
      dto.mapMediaId,
      ...(dto.galleryMediaIds || []),
    ]);

    const exp = await this.getByIdOrSlug(id);

    const targetCategoryId =
      dto.categoryId !== undefined ? dto.categoryId : exp.categoryId;
    const targetSubcategoryId =
      dto.subcategoryId !== undefined ? dto.subcategoryId : exp.subcategoryId;

    await this.categoryService.validateResourceCategory(
      CategoryType.EXPEDITIONS,
      targetCategoryId,
      targetSubcategoryId,
    );

    if (dto.title && dto.title !== exp.title) {
      exp.title = dto.title;
      exp.slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (dto.categoryId !== undefined) {
      exp.categoryId = dto.categoryId;
    }
    if (dto.subcategoryId !== undefined) {
      exp.subcategoryId = dto.subcategoryId || null;
    }
    if (dto.region) exp.region = dto.region;
    if (dto.durationDays !== undefined)
      exp.durationDays = Number(dto.durationDays);
    if (dto.peakHeightM !== undefined) {
      exp.peakHeightM = Number(dto.peakHeightM);
    }
    if (dto.maxAltitudeMeters !== undefined) {
      exp.maxAltitudeMeters = Number(dto.maxAltitudeMeters);
    }
    if (dto.climbingGrade) exp.climbingGrade = dto.climbingGrade;
    if (dto.difficulty) exp.difficulty = dto.difficulty;
    if (dto.sherpaGuideRatio) exp.sherpaGuideRatio = dto.sherpaGuideRatio;
    if (dto.oxygenRequired !== undefined)
      exp.oxygenRequired = dto.oxygenRequired;
    if (dto.priceUSD !== undefined) exp.priceUSD = Number(dto.priceUSD);
    if (dto.status) exp.status = dto.status;
    if (dto.shortDesc !== undefined) exp.shortDesc = dto.shortDesc;
    if (dto.coverMediaId !== undefined) exp.coverMediaId = dto.coverMediaId;
    if (dto.country !== undefined) exp.country = dto.country;
    if (dto.activity !== undefined) exp.activity = dto.activity;
    if (dto.bestSeason !== undefined) exp.bestSeason = dto.bestSeason;
    if (dto.startEndLocation !== undefined)
      exp.startEndLocation = dto.startEndLocation;
    if (dto.accommodation !== undefined) exp.accommodation = dto.accommodation;
    if (dto.meals !== undefined) exp.meals = dto.meals;
    if (dto.groupSizeRange !== undefined)
      exp.groupSizeRange = dto.groupSizeRange;
    if (dto.inclusionsText !== undefined)
      exp.inclusionsText = dto.inclusionsText;
    if (dto.exclusionsText !== undefined)
      exp.exclusionsText = dto.exclusionsText;
    if (dto.itinerary !== undefined) exp.itinerary = dto.itinerary;
    if (dto.faqs !== undefined) exp.faqs = dto.faqs;
    if (dto.reviews !== undefined) exp.reviews = dto.reviews;
    if (dto.addonsText !== undefined) exp.addonsText = dto.addonsText;
    if (dto.usefulInfoText !== undefined) exp.usefulInfoText = dto.usefulInfoText;
    if (dto.departureDates !== undefined) exp.departureDates = dto.departureDates;
    if (dto.galleryMediaIds !== undefined) exp.galleryMediaIds = dto.galleryMediaIds;
    if (dto.mapMediaId !== undefined) exp.mapMediaId = dto.mapMediaId;
    if (dto.packageFiles !== undefined) exp.packageFiles = dto.packageFiles;
    if (dto.metaTitle !== undefined) exp.metaTitle = dto.metaTitle;
    if (dto.metaDescription !== undefined)
      exp.metaDescription = dto.metaDescription;
    if (dto.keywords !== undefined) exp.keywords = dto.keywords;

    const saved = await this.repo.save(exp);
    return this.mediaService.resolveItemMedia(saved);
  }

  async delete(id: string): Promise<boolean> {
    const exp = await this.getByIdOrSlug(id);
    await this.repo.remove(exp);
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
    climbingGrades: { label: string; value: string }[];
    regions: { label: string; value: string }[];
    sortOptions: { label: string; value: string }[];
    minDuration: number;
    maxDuration: number;
    minPrice: number;
    maxPrice: number;
    minAltitude: number;
    maxAltitude: number;
  }> {
    const exps = await this.repo.find();

    const dbCategories = await this.categoryRepo.find({
      where: { type: CategoryType.EXPEDITIONS, status: CategoryStatus.ACTIVE, parentId: IsNull() },
      order: { menuOrder: 'ASC', createdAt: 'DESC' },
    });

    const durations = exps
      .map((p) => Number(p.durationDays))
      .filter((d) => !isNaN(d) && d > 0);
    const prices = exps
      .map((p) => Number(p.priceUSD))
      .filter((pr) => !isNaN(pr) && pr > 0);
    const altitudes = exps
      .map((p) => Number(p.peakHeightM || p.maxAltitudeMeters))
      .filter((a) => !isNaN(a) && a > 0);

    const minDuration = durations.length > 0 ? Math.min(...durations) : 10;
    const maxDuration = durations.length > 0 ? Math.max(...durations) : 70;
    const minPrice = prices.length > 0 ? Math.min(...prices) : 2000;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 60000;
    const minAltitude = altitudes.length > 0 ? Math.min(...altitudes) : 6000;
    const maxAltitude = altitudes.length > 0 ? Math.max(...altitudes) : 8849;

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

    const climbingGrades = [
      { label: 'All Alpine Grades', value: 'All' },
      {
        label: 'Non-Technical Trekking Peak',
        value: ClimbingGrade.NON_TECHNICAL_TREKKING_PEAK,
      },
      {
        label: 'Technical Alpine Grade',
        value: ClimbingGrade.TECHNICAL_ALPINE_GRADE,
      },
      {
        label: 'Extreme Technical Grade',
        value: ClimbingGrade.EXTREME_TECHNICAL_GRADE,
      },
    ];

    const regions = [
      { label: 'All Regions', value: 'All' },
      { label: 'Everest / Khumbu Himal', value: 'Everest' },
      { label: 'Annapurna / Dhaulagiri Himal', value: 'Annapurna' },
      { label: 'Manaslu / Mansiri Himal', value: 'Manaslu' },
      { label: 'Makalu Barun Region', value: 'Makalu' },
      { label: 'Kanchanjunga Himal', value: 'Kanchanjunga' },
    ];

    const sortOptions = [
      { label: 'Featured / Newest', value: 'newest' },
      { label: 'Peak Elevation (Highest)', value: 'peak-height' },
      { label: 'Top Rated', value: 'rating' },
      { label: 'Price: Low to High', value: 'price-low' },
      { label: 'Price: High to Low', value: 'price-high' },
      { label: 'Expedition Duration', value: 'duration' },
    ];

    return {
      categories,
      climbingGrades,
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

  private async autoLinkCategories() {
    try {
      const items = await this.repo.find();
      const categories = await this.categoryRepo.find({ where: { type: CategoryType.EXPEDITIONS } });
      const parent8000 = categories.find((c) => c.slug === '8000m-technical-expeditions');
      const parent6000 = categories.find((c) => c.slug === '6000m-7000m-peaks');

      for (const item of items) {
        let changed = false;
        if (item.slug === 'everest-summit-expedition') {
          if (parent8000 && item.categoryId !== parent8000.id) {
            item.categoryId = parent8000.id;
            const sub = categories.find((c) => c.slug === 'mt-everest-expedition');
            if (sub) item.subcategoryId = sub.id;
            changed = true;
          }
        } else if (!item.categoryId || (parent8000 && item.categoryId === parent8000.id && item.peakHeightM < 8000)) {
          const sub = categories.find((c) => c.parentId !== null && (item.slug.includes(c.slug) || c.slug.includes(item.slug)));
          if (sub && sub.parentId) {
            item.subcategoryId = sub.id;
            item.categoryId = sub.parentId;
            changed = true;
          } else if (parent6000 && item.peakHeightM < 8000) {
            item.categoryId = parent6000.id;
            changed = true;
          }
        }
        if (changed) {
          await this.repo.save(item);
        }
      }
    } catch (e) {
      // ignore
    }
  }
}
