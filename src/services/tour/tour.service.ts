import { In } from 'typeorm';
import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Tour, TourStatus, TourType } from '../../entities/tour/Tour.entity';
import { TripDifficulty } from '../../entities/common/difficulty.enum';
import { TripActivity } from '../../entities/common/activity.enum';
import {
  Category,
  CategoryType,
} from '../../entities/category/Category.entity';
import { CreateTourDto, UpdateTourDto } from '../../schemas/tour.schema';
import { AppError } from '../../utils/appError.util';

import { MediaService } from '../media/media.service';

@autoInjectable()
export class TourService {
  private repo = AppDataSource.getRepository(Tour);
  private categoryRepo = AppDataSource.getRepository(Category);

  constructor(private mediaService: MediaService = new MediaService()) {}

  async getPublicAll(params?: {
    categoryId?: string;
    region?: string;
    tourType?: TourType;
    difficulty?: TripDifficulty;
    status?: TourStatus;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minDuration?: number;
    maxDuration?: number;
    sortBy?: string;
    limit?: number;
    page?: number;
  }): Promise<[Tour[], number]> {
    return this.getAll({
      ...params,
      isPublic: true,
    });
  }

  async getAdminAll(params?: {
    categoryId?: string;
    region?: string;
    tourType?: TourType;
    difficulty?: TripDifficulty;
    status?: TourStatus;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minDuration?: number;
    maxDuration?: number;
    sortBy?: string;
    limit?: number;
    page?: number;
  }): Promise<[Tour[], number]> {
    return this.getAll({
      ...params,
      isPublic: false,
    });
  }

  async getAll(params?: {
    categoryId?: string;
    region?: string;
    tourType?: TourType;
    difficulty?: TripDifficulty;
    status?: TourStatus;
    isPublic?: boolean;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minDuration?: number;
    maxDuration?: number;
    sortBy?: string;
    limit?: number;
    page?: number;
  }): Promise<[Tour[], number]> {
    const qb = this.repo.createQueryBuilder('tour');

    if (params?.categoryId && params.categoryId !== 'All') {
      qb.andWhere('tour.categoryId = :categoryId', {
        categoryId: params.categoryId,
      });
    }
    if (params?.region && params.region !== 'All') {
      qb.andWhere('LOWER(tour.region) = LOWER(:region)', {
        region: params.region,
      });
    }
    if (params?.tourType) {
      qb.andWhere('tour.tourType = :tourType', { tourType: params.tourType });
    }
    if (params?.difficulty && (params.difficulty as any) !== 'All') {
      qb.andWhere('LOWER(tour.difficulty) = LOWER(:difficulty)', {
        difficulty: params.difficulty,
      });
    }
    if (params?.isPublic) {
      if (params?.status && (params.status === TourStatus.ACTIVE || params.status === TourStatus.FEATURED)) {
        qb.andWhere('tour.status = :status', { status: params.status });
      } else {
        qb.andWhere('tour.status IN (:...publicStatuses)', {
          publicStatuses: [TourStatus.ACTIVE, TourStatus.FEATURED],
        });
      }
    } else if (params?.status) {
      qb.andWhere('tour.status = :status', { status: params.status });
    }
    if (params?.search && params.search.trim()) {
      qb.andWhere(
        '(LOWER(tour.title) LIKE :search OR LOWER(tour.shortDesc) LIKE :search OR LOWER(tour.region) LIKE :search OR LOWER(tour.startEndLocation) LIKE :search)',
        {
          search: `%${params.search.trim().toLowerCase()}%`,
        },
      );
    }
    if (params?.minPrice !== undefined && Number(params.minPrice) > 0) {
      qb.andWhere('tour.priceUSD >= :minPrice', {
        minPrice: Number(params.minPrice),
      });
    }
    if (params?.maxPrice !== undefined && Number(params.maxPrice) > 0) {
      qb.andWhere('tour.priceUSD <= :maxPrice', {
        maxPrice: Number(params.maxPrice),
      });
    }
    if (params?.minDuration !== undefined && Number(params.minDuration) > 0) {
      qb.andWhere('tour.durationDays >= :minDuration', {
        minDuration: Number(params.minDuration),
      });
    }
    if (params?.maxDuration !== undefined && Number(params.maxDuration) > 0) {
      qb.andWhere('tour.durationDays <= :maxDuration', {
        maxDuration: Number(params.maxDuration),
      });
    }

    switch (params?.sortBy) {
      case 'rating':
        qb.orderBy('tour.rating', 'DESC').addOrderBy(
          'tour.reviewsCount',
          'DESC',
        );
        break;
      case 'price-low':
        qb.orderBy('tour.priceUSD', 'ASC');
        break;
      case 'price-high':
        qb.orderBy('tour.priceUSD', 'DESC');
        break;
      case 'duration':
        qb.orderBy('tour.durationDays', 'ASC');
        break;
      case 'newest':
      default:
        qb.orderBy('tour.createdAt', 'DESC');
        break;
    }

    if (params?.limit) {
      qb.take(params.limit);
      if (params.page && params.page > 1) {
        qb.skip((params.page - 1) * params.limit);
      }
    }

    const [items, count] = await qb.getManyAndCount();
    const resolved = await Promise.all(
      items.map((i) => this.mediaService.resolveItemMedia(i)),
    );
    return [resolved, count];
  }

  async getByIdOrSlug(idOrSlug: string): Promise<Tour> {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        idOrSlug,
      );

    let item: Tour | null = null;
    if (isUuid) {
      item = await this.repo.findOne({ where: { id: idOrSlug } });
    }
    if (!item) {
      item = await this.repo.findOne({ where: { slug: idOrSlug } });
    }

    if (!item) throw AppError.notFound(`Tour package ${idOrSlug} not found`);
    return this.mediaService.resolveItemMedia(item);
  }

  async getPublicByIdOrSlug(idOrSlug: string): Promise<Tour> {
    const item = await this.getByIdOrSlug(idOrSlug);
    if (item.status !== TourStatus.ACTIVE && item.status !== TourStatus.FEATURED) {
      throw AppError.notFound(`Tour package ${idOrSlug} not found`);
    }
    return item;
  }

  async create(dto: CreateTourDto): Promise<Tour> {
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

    const tour = this.repo.create({
      title: dto.title,
      slug,
      categoryId,
      region: dto.region,
      tourType: dto.tourType || TourType.CULTURAL_HERITAGE,
      transportation: dto.transportation,
      durationDays: Number(dto.durationDays),
      maxAltitudeMeters: Number(dto.maxAltitudeMeters) || 1400,
      difficulty: dto.difficulty || TripDifficulty.EASY,
      priceUSD: Number(dto.priceUSD),
      status: dto.status || TourStatus.ACTIVE,
      shortDesc: dto.shortDesc,
      image: dto.image,
      coverMediaId: dto.coverMediaId,
      country: dto.country || 'Nepal',
      activity: dto.activity || TripActivity.CULTURAL_SIGHTSEEING,
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
      addonsText: dto.addonsText,
      usefulInfoText: dto.usefulInfoText,
      departureDates: dto.departureDates || [],
      galleryImages: dto.galleryImages || [],
      galleryMediaIds: dto.galleryMediaIds || [],
      mapImage: dto.mapImage,
      mapMediaId: dto.mapMediaId,
      packageFiles: dto.packageFiles || [],
      metaTitle: dto.metaTitle,
      metaDescription: dto.metaDescription,
      keywords: dto.keywords,
      rating: 5.0,
      reviewsCount: 0,
      totalBookings: 0,
    } as Partial<Tour>);

    const saved = await this.repo.save(tour);
    return this.mediaService.resolveItemMedia(saved);
  }

  async update(id: string, dto: UpdateTourDto): Promise<Tour> {
    const tour = await this.getByIdOrSlug(id);

    if (dto.title && dto.title !== tour.title) {
      tour.title = dto.title;
      tour.slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (dto.categoryId !== undefined) {
      tour.categoryId = dto.categoryId;
    }
    if (dto.region) tour.region = dto.region;
    if (dto.tourType) tour.tourType = dto.tourType;
    if (dto.transportation !== undefined) tour.transportation = dto.transportation;
    if (dto.durationDays !== undefined)
      tour.durationDays = Number(dto.durationDays);
    if (dto.maxAltitudeMeters !== undefined)
      tour.maxAltitudeMeters = Number(dto.maxAltitudeMeters);
    if (dto.difficulty) tour.difficulty = dto.difficulty;
    if (dto.priceUSD !== undefined) tour.priceUSD = Number(dto.priceUSD);
    if (dto.status) tour.status = dto.status;
    if (dto.shortDesc !== undefined) tour.shortDesc = dto.shortDesc;
    if (dto.image !== undefined) tour.image = dto.image;
    if (dto.coverMediaId !== undefined) tour.coverMediaId = dto.coverMediaId;
    if (dto.country !== undefined) tour.country = dto.country;
    if (dto.activity !== undefined) tour.activity = dto.activity;
    if (dto.bestSeason !== undefined) tour.bestSeason = dto.bestSeason;
    if (dto.startEndLocation !== undefined)
      tour.startEndLocation = dto.startEndLocation;
    if (dto.accommodation !== undefined) tour.accommodation = dto.accommodation;
    if (dto.meals !== undefined) tour.meals = dto.meals;
    if (dto.groupSizeRange !== undefined)
      tour.groupSizeRange = dto.groupSizeRange;
    if (dto.permitsRequired) {
      tour.permitsRequired = dto.permitsRequired;
    } else if (dto.permitsText !== undefined) {
      tour.permitsRequired = dto.permitsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (dto.inclusionsText !== undefined)
      tour.inclusionsText = dto.inclusionsText;
    if (dto.exclusionsText !== undefined)
      tour.exclusionsText = dto.exclusionsText;
    if (dto.itinerary !== undefined) tour.itinerary = dto.itinerary;
    if (dto.faqs !== undefined) tour.faqs = dto.faqs;
    if (dto.reviews !== undefined) tour.reviews = dto.reviews;
    if (dto.addonsText !== undefined) tour.addonsText = dto.addonsText;
    if (dto.usefulInfoText !== undefined) tour.usefulInfoText = dto.usefulInfoText;
    if (dto.departureDates !== undefined) tour.departureDates = dto.departureDates;
    if (dto.galleryImages !== undefined) tour.galleryImages = dto.galleryImages;
    if (dto.galleryMediaIds !== undefined) tour.galleryMediaIds = dto.galleryMediaIds;
    if (dto.mapImage !== undefined) tour.mapImage = dto.mapImage;
    if (dto.mapMediaId !== undefined) tour.mapMediaId = dto.mapMediaId;
    if (dto.packageFiles !== undefined) tour.packageFiles = dto.packageFiles;
    if (dto.metaTitle !== undefined) tour.metaTitle = dto.metaTitle;
    if (dto.metaDescription !== undefined)
      tour.metaDescription = dto.metaDescription;
    if (dto.keywords !== undefined) tour.keywords = dto.keywords;

    const saved = await this.repo.save(tour);
    return this.mediaService.resolveItemMedia(saved);
  }

  async delete(id: string): Promise<boolean> {
    const tour = await this.getByIdOrSlug(id);
    await this.repo.remove(tour);
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
    tourTypes: { label: string; value: string }[];
    regions: { label: string; value: string }[];
    sortOptions: { label: string; value: string }[];
    minDuration: number;
    maxDuration: number;
    minPrice: number;
    maxPrice: number;
  }> {
    const tours = await this.repo.find();

    const categoryIds = Array.from(
      new Set(
        tours
          .map((p) => p.categoryId)
          .filter((id): id is string => Boolean(id)),
      ),
    );
    const dbCategories =
      categoryIds.length > 0
        ? await this.categoryRepo.find({ where: { id: In(categoryIds) } })
        : await this.categoryRepo.find({ where: { type: CategoryType.TOURS } });

    const durations = tours
      .map((p) => Number(p.durationDays))
      .filter((d) => !isNaN(d) && d > 0);
    const prices = tours
      .map((p) => Number(p.priceUSD))
      .filter((pr) => !isNaN(pr) && pr > 0);

    const minDuration = durations.length > 0 ? Math.min(...durations) : 1;
    const maxDuration = durations.length > 0 ? Math.max(...durations) : 15;
    const minPrice = prices.length > 0 ? Math.min(...prices) : 100;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 5000;

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

    const tourTypes = [
      { label: 'All Tour Types', value: 'All' },
      { label: 'Cultural & Royal Heritage', value: TourType.CULTURAL_HERITAGE },
      { label: 'Lakeside & Wellness Retreat', value: TourType.LUXURY_WELLNESS },
      { label: 'Wildlife Jungle Safari', value: TourType.WILDLIFE_SAFARI },
      { label: 'Helicopter & Scenic Flight', value: TourType.HELICOPTER_TOUR },
      { label: 'Day Excursion', value: TourType.DAY_TOUR },
    ];

    const regions = [
      { label: 'All Regions', value: 'All' },
      { label: 'Kathmandu Valley', value: 'Kathmandu' },
      { label: 'Pokhara & Phewa Lake', value: 'Pokhara' },
      { label: 'Chitwan National Park', value: 'Chitwan' },
      { label: 'Lumbini (Birthplace of Buddha)', value: 'Lumbini' },
      { label: 'Nagarkot & Dhulikhel', value: 'Nagarkot' },
    ];

    const sortOptions = [
      { label: 'Featured / Newest', value: 'newest' },
      { label: 'Top Rated', value: 'rating' },
      { label: 'Price: Low to High', value: 'price-low' },
      { label: 'Price: High to Low', value: 'price-high' },
      { label: 'Duration: Short to Long', value: 'duration' },
    ];

    return {
      categories,
      tourTypes,
      regions,
      sortOptions,
      minDuration,
      maxDuration,
      minPrice,
      maxPrice,
    };
  }
}
