import { In } from 'typeorm';
import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import {
  Package,
  PackageCategoryType,
  PackageStatus,
} from '../../entities/package/Package.entity';
import {
  Category,
  CategoryStatus,
  CategoryType,
} from '../../entities/category/Category.entity';
import {
  CreatePackageDto,
  UpdatePackageDto,
} from '../../schemas/package.schema';
import { AppError } from '../../utils/appError.util';

@autoInjectable()
export class PackageService {
  private repo = AppDataSource.getRepository(Package);
  private categoryRepo = AppDataSource.getRepository(Category);

  async getAll(params?: {
    categoryType?: PackageCategoryType;
    categoryId?: string;
    region?: string;
    difficulty?: string;
    status?: PackageStatus;
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
  }): Promise<Package[]> {
    const qb = this.repo.createQueryBuilder('pkg');

    if (params?.categoryType) {
      qb.andWhere('pkg.categoryType = :categoryType', {
        categoryType: params.categoryType,
      });
    }
    if (params?.categoryId && params.categoryId !== 'All') {
      qb.andWhere('pkg.categoryId = :categoryId', {
        categoryId: params.categoryId,
      });
    }
    if (params?.region && params.region !== 'All') {
      qb.andWhere('LOWER(pkg.region) = LOWER(:region)', { region: params.region });
    }
    if (params?.difficulty && params.difficulty !== 'All') {
      qb.andWhere('pkg.difficulty = :difficulty', {
        difficulty: params.difficulty,
      });
    }
    if (params?.status) {
      qb.andWhere('pkg.status = :status', { status: params.status });
    }
    if (params?.search && params.search.trim()) {
      qb.andWhere(
        '(LOWER(pkg.title) LIKE :search OR LOWER(pkg.shortDesc) LIKE :search OR LOWER(pkg.region) LIKE :search OR LOWER(pkg.difficulty) LIKE :search OR LOWER(pkg.startEndLocation) LIKE :search)',
        {
          search: `%${params.search.trim().toLowerCase()}%`,
        },
      );
    }
    if (params?.minPrice !== undefined && Number(params.minPrice) > 0) {
      qb.andWhere('pkg.priceUSD >= :minPrice', { minPrice: Number(params.minPrice) });
    }
    if (params?.maxPrice !== undefined && Number(params.maxPrice) > 0) {
      qb.andWhere('pkg.priceUSD <= :maxPrice', { maxPrice: Number(params.maxPrice) });
    }
    if (params?.minDuration !== undefined && Number(params.minDuration) > 0) {
      qb.andWhere('pkg.durationDays >= :minDuration', { minDuration: Number(params.minDuration) });
    }
    if (params?.maxDuration !== undefined && Number(params.maxDuration) > 0) {
      qb.andWhere('pkg.durationDays <= :maxDuration', { maxDuration: Number(params.maxDuration) });
    }
    if (params?.minAltitude !== undefined && Number(params.minAltitude) > 0) {
      qb.andWhere('pkg.maxAltitudeMeters >= :minAltitude', { minAltitude: Number(params.minAltitude) });
    }
    if (params?.maxAltitude !== undefined && Number(params.maxAltitude) > 0) {
      qb.andWhere('pkg.maxAltitudeMeters <= :maxAltitude', { maxAltitude: Number(params.maxAltitude) });
    }

    switch (params?.sortBy) {
      case 'rating':
        qb.orderBy('pkg.rating', 'DESC').addOrderBy('pkg.reviewsCount', 'DESC');
        break;
      case 'price-low':
        qb.orderBy('pkg.priceUSD', 'ASC');
        break;
      case 'price-high':
        qb.orderBy('pkg.priceUSD', 'DESC');
        break;
      case 'duration':
        qb.orderBy('pkg.durationDays', 'ASC');
        break;
      case 'altitude':
        qb.orderBy('pkg.maxAltitudeMeters', 'DESC');
        break;
      case 'newest':
      default:
        qb.orderBy('pkg.createdAt', 'DESC');
        break;
    }

    if (params?.limit) {
      qb.take(params.limit);
      if (params.page && params.page > 1) {
        qb.skip((params.page - 1) * params.limit);
      }
    }

    return qb.getMany();
  }

  async getByIdOrSlug(idOrSlug: string): Promise<Package> {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        idOrSlug,
      );

    let item: Package | null = null;
    if (isUuid) {
      item = await this.repo.findOne({ where: { id: idOrSlug } });
    }
    if (!item) {
      item = await this.repo.findOne({ where: { slug: idOrSlug } });
    }

    if (!item) throw AppError.notFound(`Package ${idOrSlug} not found`);
    return item;
  }

  async create(dto: CreatePackageDto): Promise<Package> {
    let slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await this.repo.findOne({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // Validate categoryId and resolve category name
    if (!dto.categoryId) throw AppError.badRequest('categoryId is required');
    const categoryEntity = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    if (!categoryEntity) throw AppError.notFound(`Category ${dto.categoryId} not found`);

    const permitsArray = dto.permitsRequired
      ? dto.permitsRequired
      : dto.permitsText
        ? dto.permitsText
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const pkg = this.repo.create({
      title: dto.title,
      slug,
      categoryType: dto.categoryType || 'Trekking',
      categoryId: categoryEntity.id,
      region: dto.region,
      durationDays: Number(dto.durationDays),
      maxAltitudeMeters: Number(dto.maxAltitudeMeters) || 1400,
      difficulty: dto.difficulty || 'Moderate',
      priceUSD: Number(dto.priceUSD),
      status: dto.status || 'Active',
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
      metaTitle: dto.metaTitle,
      metaDescription: dto.metaDescription,
      keywords: dto.keywords,
      rating: 5.0,
      reviewsCount: 0,
      totalBookings: 0,
    });

    return this.repo.save(pkg);
  }

  async update(id: string, dto: UpdatePackageDto): Promise<Package> {
    const pkg = await this.getByIdOrSlug(id);

    if (dto.title && dto.title !== pkg.title) {
      pkg.title = dto.title;
      pkg.slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (dto.categoryType) pkg.categoryType = dto.categoryType;
    if (dto.categoryId) {
      const categoryEntity = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
      if (!categoryEntity) throw AppError.notFound(`Category ${dto.categoryId} not found`);
      pkg.categoryId = categoryEntity.id;
    }
    if (dto.region) pkg.region = dto.region;
    if (dto.durationDays !== undefined)
      pkg.durationDays = Number(dto.durationDays);
    if (dto.maxAltitudeMeters !== undefined)
      pkg.maxAltitudeMeters = Number(dto.maxAltitudeMeters);
    if (dto.difficulty) pkg.difficulty = dto.difficulty;
    if (dto.priceUSD !== undefined) pkg.priceUSD = Number(dto.priceUSD);
    if (dto.status) pkg.status = dto.status;
    if (dto.shortDesc) pkg.shortDesc = dto.shortDesc;
    if (dto.image) pkg.image = dto.image;
    if (dto.bestSeason !== undefined) pkg.bestSeason = dto.bestSeason;
    if (dto.startEndLocation !== undefined)
      pkg.startEndLocation = dto.startEndLocation;
    if (dto.accommodation !== undefined) pkg.accommodation = dto.accommodation;
    if (dto.meals !== undefined) pkg.meals = dto.meals;
    if (dto.groupSizeRange !== undefined)
      pkg.groupSizeRange = dto.groupSizeRange;
    if (dto.permitsRequired) {
      pkg.permitsRequired = dto.permitsRequired;
    } else if (dto.permitsText !== undefined) {
      pkg.permitsRequired = dto.permitsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (dto.inclusionsText !== undefined)
      pkg.inclusionsText = dto.inclusionsText;
    if (dto.exclusionsText !== undefined)
      pkg.exclusionsText = dto.exclusionsText;
    if (dto.metaTitle !== undefined) pkg.metaTitle = dto.metaTitle;
    if (dto.metaDescription !== undefined)
      pkg.metaDescription = dto.metaDescription;
    if (dto.keywords !== undefined) pkg.keywords = dto.keywords;

    return this.repo.save(pkg);
  }

  async delete(id: string): Promise<boolean> {
    const pkg = await this.getByIdOrSlug(id);
    await this.repo.remove(pkg);
    return true;
  }

  async getFilterOptions(categoryType?: PackageCategoryType): Promise<{
    categoryType?: string;
    categories: { label: string; value: string; id?: string; name?: string; slug?: string }[];
    styles: { label: string; value: string; id?: string; name?: string; slug?: string }[];
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
    const qb = this.repo.createQueryBuilder('pkg');
    if (categoryType) {
      qb.andWhere('pkg.categoryType = :categoryType', { categoryType });
    }

    const packages = await qb.getMany();

    // Distinct values from DB via category lookup
    const categoryIds = Array.from(
      new Set(packages.map((p) => p.categoryId).filter((id): id is string => Boolean(id))),
    );
    const dbCategories =
      categoryIds.length > 0
        ? (await this.categoryRepo.find({ where: { id: In(categoryIds) } })).map((c) => c.name).filter(Boolean)
        : [];
    const dbRegions = Array.from(new Set(packages.map((p) => p.region).filter(Boolean)));

    // Min & Max calculations
    const durations = packages.map((p) => Number(p.durationDays)).filter((d) => !isNaN(d) && d > 0);
    const prices = packages.map((p) => Number(p.priceUSD)).filter((pr) => !isNaN(pr) && pr > 0);
    const altitudes = packages.map((p) => Number(p.maxAltitudeMeters)).filter((a) => !isNaN(a) && a > 0);

    const minDuration = durations.length > 0 ? Math.min(...durations) : 1;
    const maxDuration = durations.length > 0 ? Math.max(...durations) : 30;
    const minPrice = prices.length > 0 ? Math.min(...prices) : 100;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 10000;
    const minAltitude = altitudes.length > 0 ? Math.min(...altitudes) : 1400;
    const maxAltitude = altitudes.length > 0 ? Math.max(...altitudes) : 8848;

    let categoryEntityEnum: CategoryType = CategoryType.TREKKING;
    if (categoryType === PackageCategoryType.TOUR) {
      categoryEntityEnum = CategoryType.TOURS;
    } else if (categoryType === PackageCategoryType.EXPEDITION) {
      categoryEntityEnum = CategoryType.EXPEDITIONS;
    }

    const dynamicCategories = await this.categoryRepo.find({
      where: { type: categoryEntityEnum, status: CategoryStatus.ACTIVE },
      order: { name: 'ASC' },
    });

    const categoryOptions = [
      { label: 'All Categories', value: 'All' },
      ...dynamicCategories.map((c) => ({
        label: c.name,
        value: c.id,
        id: c.id,
        name: c.name,
        slug: c.slug,
      })),
    ];

    const dbDifficulties = Array.from(
      new Set(
        packages
          .map((p) => p.difficulty?.trim())
          .filter((d): d is string => Boolean(d)),
      ),
    );

    let difficultyLabel = 'All Difficulties';
    let defaultDifficulties: string[] = ['Moderate Trek', 'Challenging Trek', 'Strenuous Trek'];
    if (categoryType === PackageCategoryType.TOUR) {
      difficultyLabel = 'All Levels';
      defaultDifficulties = ['Easy / Leisure', 'Moderate', 'Challenging'];
    } else if (categoryType === PackageCategoryType.EXPEDITION) {
      difficultyLabel = 'All Alpine Grades';
      defaultDifficulties = ['Alpine PD', 'Alpine AD', 'Alpine D', 'Alpine ED'];
    }

    const uniqueDifficulties =
      dbDifficulties.length > 0
        ? dbDifficulties
        : defaultDifficulties;

    const difficulties = [
      { label: difficultyLabel, value: 'All' },
      ...uniqueDifficulties.map((d) => ({ label: d, value: d })),
    ];

    let sortOptions: { label: string; value: string }[] = [];
    if (categoryType === PackageCategoryType.TOUR) {
      sortOptions = [
        { label: 'Guest Rating', value: 'rating' },
        { label: 'Price: Low to High', value: 'price-low' },
        { label: 'Price: High to Low', value: 'price-high' },
        { label: 'Duration: Short to Long', value: 'duration' },
        { label: 'Newest Added', value: 'newest' },
      ];
    } else if (categoryType === PackageCategoryType.EXPEDITION) {
      sortOptions = [
        { label: 'Guest Rating', value: 'rating' },
        { label: 'Price: Low to High', value: 'price-low' },
        { label: 'Price: High to Low', value: 'price-high' },
        { label: 'Peak Elevation: High to Low', value: 'altitude' },
        { label: 'Duration: Short to Long', value: 'duration' },
        { label: 'Newest Added', value: 'newest' },
      ];
    } else {
      sortOptions = [
        { label: 'Guest Rating', value: 'rating' },
        { label: 'Price: Low to High', value: 'price-low' },
        { label: 'Price: High to Low', value: 'price-high' },
        { label: 'Duration: Short to Long', value: 'duration' },
        { label: 'Highest Altitude', value: 'altitude' },
        { label: 'Newest Added', value: 'newest' },
      ];
    }

    const standardRegions = [
      { label: 'All Regions', value: 'All' },
      ...dbRegions.map((r) => ({ label: r, value: r })),
    ];

    return {
      categoryType,
      categories: categoryOptions,
      styles: categoryOptions,
      difficulties,
      regions: standardRegions,
      sortOptions,
      minDuration,
      maxDuration: Math.max(
        maxDuration,
        categoryType === PackageCategoryType.TOUR ? 10 : 30,
      ),
      minPrice,
      maxPrice,
      minAltitude,
      maxAltitude,
    };
  }
}
