import { autoInjectable } from 'tsyringe';
import { isUUID } from 'class-validator';
import { AppDataSource } from '../../config/database.config';
import { Activity, ActivityStatus } from '../../entities/activity/Activity.entity';
import { CreateActivityDto, UpdateActivityDto } from '../../schemas/activity.schema';
import { AppError } from '../../utils/appError.util';
import { MediaService } from '../media/media.service';

@autoInjectable()
export class ActivityService {
  private repo = AppDataSource.getRepository(Activity);

  constructor(
    private mediaService: MediaService = new MediaService(),
  ) {}

  async getAll(params?: {
    status?: ActivityStatus;
    search?: string;
    limit?: number;
    page?: number;
    isFeatured?: boolean;
  }): Promise<[Activity[], number]> {
    const qb = this.repo.createQueryBuilder('act');

    if (params?.status && (params.status as any) !== 'All') {
      qb.andWhere('act.status = :status', { status: params.status });
    }

    if (params?.isFeatured !== undefined) {
      qb.andWhere('act.isFeatured = :isFeatured', { isFeatured: params.isFeatured });
    }

    if (params?.search && params.search.trim()) {
      const term = `%${params.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(act.name) LIKE :term OR LOWER(act.description) LIKE :term OR LOWER(act.slug) LIKE :term)',
        { term },
      );
    }

    qb.orderBy('act.menuOrder', 'ASC').addOrderBy('act.createdAt', 'DESC');

    if (params?.limit) {
      qb.take(params.limit);
      if (params.page && params.page > 1) {
        qb.skip((params.page - 1) * params.limit);
      }
    }

    const [items, count] = await qb.getManyAndCount();
    const resolved = await Promise.all(
      items.map((act) => this.mediaService.resolveItemMedia(act)),
    );

    // Attach tripCount (treks + tours + expeditions that list this activity) to each activity
    const publicStatuses = ['active', 'featured'];
    const withCounts = await Promise.all(
      resolved.map(async (act) => {
        const actIdJson = JSON.stringify(act.id);

        const [trekCount, tourCount, expeditionCount] = await Promise.all([
          AppDataSource.getRepository('treks')
            .createQueryBuilder('t')
            .where('JSON_CONTAINS(t.activity_ids, :actId)', { actId: actIdJson })
            .andWhere('t.status IN (:...statuses)', { statuses: publicStatuses })
            .getCount(),
          AppDataSource.getRepository('tours')
            .createQueryBuilder('t')
            .where('JSON_CONTAINS(t.activity_ids, :actId)', { actId: actIdJson })
            .andWhere('t.status IN (:...statuses)', { statuses: publicStatuses })
            .getCount(),
          AppDataSource.getRepository('expeditions')
            .createQueryBuilder('t')
            .where('JSON_CONTAINS(t.activity_ids, :actId)', { actId: actIdJson })
            .andWhere('t.status IN (:...statuses)', { statuses: publicStatuses })
            .getCount(),
        ]);

        return Object.assign(act, { tripCount: trekCount + tourCount + expeditionCount });
      }),
    );

    return [withCounts, count];
  }

  async getByIdOrSlug(idOrSlug: string): Promise<Activity> {
    const qb = this.repo.createQueryBuilder('act');

    if (isUUID(idOrSlug)) {
      qb.where('act.id = :idOrSlug', { idOrSlug });
    } else {
      qb.where('act.slug = :idOrSlug', { idOrSlug });
    }

    const activity = await qb.getOne();
    if (!activity) {
      throw AppError.notFound('Activity not found');
    }

    return this.mediaService.resolveItemMedia(activity);
  }

  async create(dto: CreateActivityDto): Promise<Activity> {
    const existing = await this.repo.findOne({ where: { slug: dto.slug } });
    if (existing) {
      throw AppError.badRequest(`Activity with slug '${dto.slug}' already exists.`);
    }

    const activity = this.repo.create({
      name: dto.name,
      slug: dto.slug,
      description: dto.description || '',
      status: dto.status || ActivityStatus.ACTIVE,
      isFeatured: dto.isFeatured ?? false,
      menuOrder: dto.menuOrder ?? 0,
      mediaId: dto.mediaId || null,
    });

    const saved = await this.repo.save(activity);
    return this.mediaService.resolveItemMedia(saved);
  }

  async update(id: string, dto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.getByIdOrSlug(id);

    if (dto.slug && dto.slug !== activity.slug) {
      const existing = await this.repo.findOne({ where: { slug: dto.slug } });
      if (existing) {
        throw AppError.badRequest(`Activity with slug '${dto.slug}' already exists.`);
      }
      activity.slug = dto.slug;
    }

    if (dto.name !== undefined) activity.name = dto.name;
    if (dto.description !== undefined) activity.description = dto.description;
    if (dto.status !== undefined) activity.status = dto.status;
    if (dto.isFeatured !== undefined) activity.isFeatured = dto.isFeatured;
    if (dto.menuOrder !== undefined) activity.menuOrder = dto.menuOrder;
    if (dto.mediaId !== undefined) activity.mediaId = dto.mediaId;

    const saved = await this.repo.save(activity);
    return this.mediaService.resolveItemMedia(saved);
  }

  async delete(id: string): Promise<boolean> {
    const activity = await this.getByIdOrSlug(id);
    await this.repo.remove(activity);
    return true;
  }

  async reorderActivities(items: { id: string; menuOrder: number }[]): Promise<boolean> {
    if (!items || items.length === 0) return true;

    await AppDataSource.transaction(async (manager) => {
      for (const item of items) {
        await manager.update(Activity, item.id, { menuOrder: item.menuOrder });
      }
    });

    return true;
  }
}
