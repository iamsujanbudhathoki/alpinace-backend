import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Package } from '../../entities/package/Package.entity';
import {
  CreatePackageDto,
  UpdatePackageDto,
} from '../../schemas/package.schema';
import { AppError } from '../../utils/appError.util';

@autoInjectable()
export class PackageService {
  private repo = AppDataSource.getRepository(Package);

  async getAll(params?: {
    categoryType?: 'Trekking' | 'Expedition' | 'Tour';
    region?: string;
    difficulty?: string;
    status?: 'Active' | 'Featured' | 'Draft';
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
}
