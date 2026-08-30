import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Testimonial, TestimonialStatus } from '../../entities/testimonial/Testimonial.entity';
import { CreateTestimonialDto, UpdateTestimonialDto, ReorderTestimonialItemDto } from '../../schemas/testimonial.schema';
import { TestimonialQueryParamsDto } from '../../schemas/query-params.schema';
import { applyBaseQueryParams } from '../../utils/query-builder.util';
import { AppError } from '../../utils/appError.util';
import { MediaService } from '../media/media.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditEntityType } from '../../constants/audit.constants';

@autoInjectable()
export class TestimonialService {
  private repo = AppDataSource.getRepository(Testimonial);

  constructor(
    private mediaService: MediaService = new MediaService(),
    private auditLogService: AuditLogService = new AuditLogService(),
  ) {}

  async getAll(params: TestimonialQueryParamsDto = {}): Promise<[Testimonial[], number]> {
    const qb = this.repo.createQueryBuilder('testimonial');

    applyBaseQueryParams(qb, 'testimonial', params, ['author', 'role', 'country', 'tripName', 'content']);

    const [items, count] = await qb.getManyAndCount();
    const resolvedItems = await Promise.all(
      items.map((item) => this.mediaService.resolveItemMedia(item)),
    );

    return [resolvedItems, count];
  }

  async getById(id: string): Promise<Testimonial> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) {
      throw AppError.notFound('Testimonial not found');
    }
    return this.mediaService.resolveItemMedia(item);
  }

  async create(dto: CreateTestimonialDto): Promise<Testimonial> {
    if (dto.avatarMediaId) {
      await this.mediaService.validateMediaExists(dto.avatarMediaId);
    }

    let orderVal = dto.order;
    if (orderVal === undefined || orderVal === null) {
      const maxOrder = await this.repo.maximum('order');
      orderVal = (maxOrder || 0) + 1;
    }

    const item = this.repo.create({
      ...dto,
      order: orderVal,
      status: dto.status || TestimonialStatus.ACTIVE,
      rating: dto.rating !== undefined ? dto.rating : 5,
    });

    const saved = await this.repo.save(item);
    await this.auditLogService.logCreate(AuditEntityType.TESTIMONIAL, saved.id, saved);
    return this.mediaService.resolveItemMedia(saved);
  }

  async update(id: string, dto: UpdateTestimonialDto): Promise<Testimonial> {
    if (dto.avatarMediaId) {
      await this.mediaService.validateMediaExists(dto.avatarMediaId);
    }

    const item = await this.getById(id);
    const oldState = { ...item };
    Object.assign(item, dto);
    const saved = await this.repo.save(item);
    await this.auditLogService.logUpdate(AuditEntityType.TESTIMONIAL, saved.id, oldState, saved);
    return this.mediaService.resolveItemMedia(saved);
  }

  async delete(id: string): Promise<boolean> {
    const item = await this.getById(id);
    const oldState = { ...item };
    await this.repo.remove(item);
    await this.auditLogService.logDelete(AuditEntityType.TESTIMONIAL, id, oldState);
    return true;
  }

  async reorder(items: ReorderTestimonialItemDto[]): Promise<boolean> {
    await AppDataSource.transaction(async (manager) => {
      for (const item of items) {
        await manager.update(Testimonial, { id: item.id }, { order: item.order });
      }
    });
    await this.auditLogService.logOrdering(AuditEntityType.TESTIMONIAL, items.length, null, items);
    return true;
  }
}
