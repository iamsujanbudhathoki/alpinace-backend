import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Faq, FaqStatus } from '../../entities/faq/Faq.entity';
import { CreateFaqDto, UpdateFaqDto } from '../../schemas/faq.schema';
import { FaqQueryParamsDto } from '../../schemas/query-params.schema';
import { applyBaseQueryParams } from '../../utils/query-builder.util';
import { AppError } from '../../utils/appError.util';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditEntityType } from '../../constants/audit.constants';

@autoInjectable()
export class FaqService {
  private repo = AppDataSource.getRepository(Faq);

  constructor(
    private auditLogService: AuditLogService = new AuditLogService(),
  ) {}

  async getAll(params: FaqQueryParamsDto = {}): Promise<[Faq[], number]> {
    const qb = this.repo.createQueryBuilder('faq');

    if (params.category && params.category !== 'All') {
      qb.andWhere('faq.category = :category', { category: params.category });
    }

    applyBaseQueryParams(qb, 'faq', params, ['question', 'answer', 'category']);

    return qb.getManyAndCount();
  }

  async getById(id: string): Promise<Faq> {
    const faq = await this.repo.findOne({ where: { id } });
    if (!faq) throw AppError.notFound(`FAQ ${id} not found`);
    return faq;
  }

  async create(dto: CreateFaqDto): Promise<Faq> {
    let orderVal = dto.order;
    if (orderVal === undefined || orderVal === null) {
      const maxOrder = await this.repo.maximum('order');
      orderVal = (maxOrder || 0) + 1;
    }

    const faq = this.repo.create({
      question: dto.question,
      answer: dto.answer,
      category: dto.category || 'General',
      status: dto.status || FaqStatus.ACTIVE,
      order: orderVal,
    });

    const saved = await this.repo.save(faq);
    await this.auditLogService.logCreate(AuditEntityType.FAQ, saved.id, saved);
    return saved;
  }

  async update(id: string, dto: UpdateFaqDto): Promise<Faq> {
    const faq = await this.getById(id);
    const oldState = { ...faq };
    Object.assign(faq, dto);
    const saved = await this.repo.save(faq);
    await this.auditLogService.logUpdate(AuditEntityType.FAQ, saved.id, oldState, saved);
    return saved;
  }

  async delete(id: string): Promise<boolean> {
    const faq = await this.getById(id);
    const oldState = { ...faq };
    await this.repo.remove(faq);
    await this.auditLogService.logDelete(AuditEntityType.FAQ, id, oldState);
    return true;
  }

  async reorder(items: { id: string; order: number }[]): Promise<boolean> {
    if (!Array.isArray(items) || items.length === 0) return true;

    await AppDataSource.transaction(async (manager) => {
      for (const item of items) {
        await manager.update(Faq, { id: item.id }, { order: item.order });
      }
    });

    await this.auditLogService.logOrdering(AuditEntityType.FAQ, items.length, null, items);
    return true;
  }
}
