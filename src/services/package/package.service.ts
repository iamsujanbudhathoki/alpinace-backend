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
  }): Promise<Package[]> {
    const qb = this.repo.createQueryBuilder('pkg');

    if (params?.categoryType) {
      qb.andWhere('pkg.categoryType = :categoryType', {
        categoryType: params.categoryType,
      });
    }
    if (params?.region) {
      qb.andWhere('pkg.region = :region', { region: params.region });
    }
    if (params?.difficulty) {
      qb.andWhere('pkg.difficulty = :difficulty', {
        difficulty: params.difficulty,
      });
    }
    if (params?.status) {
      qb.andWhere('pkg.status = :status', { status: params.status });
    }
    if (params?.search) {
      qb.andWhere(
        '(LOWER(pkg.title) LIKE :search OR LOWER(pkg.shortDesc) LIKE :search)',
        {
          search: `%${params.search.toLowerCase()}%`,
        },
      );
    }

    qb.orderBy('pkg.createdAt', 'DESC');
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
