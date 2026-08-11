import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import {
  Package,
  PackageCategoryType,
  PackageStatus,
} from '../../entities/package/Package.entity';
import {
  CreatePackageDto,
  UpdatePackageDto,
} from '../../schemas/package.schema';
import { AppError } from '../../utils/appError.util';

@autoInjectable()
export class PackageService {
  private repo = AppDataSource.getRepository(Package);

  async getAll(params?: {
    categoryType?: PackageCategoryType;
    region?: string;
    difficulty?: string;
    status?: PackageStatus;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minDuration?: number;
    maxDuration?: number;
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
        '(LOWER(pkg.title) LIKE :search OR LOWER(pkg.shortDesc) LIKE :search OR LOWER(pkg.region) LIKE :search OR LOWER(pkg.destination) LIKE :search)',
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
    const item = await this.repo.findOne({
      where: [{ id: idOrSlug }, { slug: idOrSlug }],
    });
    if (!item) throw AppError.notFound(`Package ${idOrSlug} not found`);
    return item;
  }

  async create(dto: CreatePackageDto): Promise<Package> {
    let slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await this.repo.findOne({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

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
      category: dto.category || dto.categoryType || 'Trekking',
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
    if (dto.category) pkg.category = dto.category;
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
    styles: { label: string; value: string }[];
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

    // Distinct values from DB
    const dbCategories = Array.from(new Set(packages.map((p) => p.category).filter(Boolean)));
    const dbDifficulties = Array.from(new Set(packages.map((p) => p.difficulty).filter(Boolean)));
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

    let styles: { label: string; value: string }[] = [];
    let difficulties: { label: string; value: string }[] = [];
    let sortOptions: { label: string; value: string }[] = [];

    if (categoryType === PackageCategoryType.TOUR) {
      const standardTourStyles = [
        { label: 'All Styles', value: 'All' },
        { label: 'Cultural Heritage', value: 'Cultural Heritage' },
        { label: 'Luxury Wildlife Safari', value: 'Luxury Wildlife Safari' },
        { label: 'Helicopter Pilgrimage', value: 'Helicopter Pilgrimage' },
        { label: 'Photography & Scenic', value: 'Photography & Scenic' },
        { label: 'Spiritual & Wellness', value: 'Spiritual & Wellness' },
      ];
      // Merge db categories
      const knownValues = new Set(standardTourStyles.map((s) => s.value));
      const extra = dbCategories
        .filter((c) => !knownValues.has(c))
        .map((c) => ({ label: c, value: c }));
      styles = [...standardTourStyles, ...extra];

      difficulties = [
        { label: 'All Levels', value: 'All' },
        { label: 'Easy / Leisure', value: 'Easy' },
        { label: 'Moderate', value: 'Moderate' },
      ];

      sortOptions = [
        { label: 'Guest Rating', value: 'rating' },
        { label: 'Price: Low to High', value: 'price-low' },
        { label: 'Price: High to Low', value: 'price-high' },
        { label: 'Duration: Short to Long', value: 'duration' },
        { label: 'Newest Added', value: 'newest' },
      ];
    } else if (categoryType === PackageCategoryType.EXPEDITION) {
      const standardExpeditionGrades = [
        { label: 'All Alpine Grades', value: 'All' },
        { label: 'PD (Slightly Difficult)', value: 'Alpine PD' },
        { label: 'AD (Fairly Difficult)', value: 'Alpine AD' },
        { label: 'D (Difficult / Technical)', value: 'Alpine D' },
        { label: 'ED (Extremely Difficult)', value: 'Alpine ED' },
      ];
      const knownGrades = new Set(standardExpeditionGrades.map((g) => g.value));
      const extraGrades = dbDifficulties
        .filter((d) => !knownGrades.has(d))
        .map((d) => ({ label: d, value: d }));
      difficulties = [...standardExpeditionGrades, ...extraGrades];

      styles = [
        { label: 'All Expeditions', value: 'All' },
        { label: 'Trekking Peak (6000m)', value: 'Trekking Peak' },
        { label: 'Major Peak (7000m+)', value: 'Major Peak' },
        { label: '8000m Summit', value: '8000m Peak' },
      ];

      sortOptions = [
        { label: 'Guest Rating', value: 'rating' },
        { label: 'Price: Low to High', value: 'price-low' },
        { label: 'Price: High to Low', value: 'price-high' },
        { label: 'Peak Elevation: High to Low', value: 'altitude' },
        { label: 'Duration: Short to Long', value: 'duration' },
        { label: 'Newest Added', value: 'newest' },
      ];
    } else {
      // Trekking (default)
      const standardTrekDifficulties = [
        { label: 'All Difficulties', value: 'All' },
        { label: 'Moderate Trek', value: 'Moderate Trek' },
        { label: 'Challenging Trek', value: 'Challenging Trek' },
        { label: 'Strenuous Trek', value: 'Strenuous Trek' },
      ];
      const knownDiffs = new Set(standardTrekDifficulties.map((d) => d.value));
      const extraDiffs = dbDifficulties
        .filter((d) => !knownDiffs.has(d))
        .map((d) => ({ label: d, value: d }));
      difficulties = [...standardTrekDifficulties, ...extraDiffs];

      styles = [
        { label: 'All Types', value: 'All' },
        { label: 'Tea House Trek', value: 'Tea House' },
        { label: 'High Pass Crossing', value: 'High Pass' },
        { label: 'Circuit Trek', value: 'Circuit' },
        { label: 'Base Camp Trek', value: 'Base Camp' },
      ];

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
      styles,
      difficulties,
      regions: standardRegions,
      sortOptions,
      minDuration,
      maxDuration: Math.max(maxDuration, categoryType === PackageCategoryType.TOUR ? 10 : 30),
      minPrice,
      maxPrice,
      minAltitude,
      maxAltitude,
    };
  }
}
