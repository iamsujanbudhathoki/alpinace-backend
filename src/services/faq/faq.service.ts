import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Faq, FaqStatus } from '../../entities/faq/Faq.entity';
import { CreateFaqDto, UpdateFaqDto } from '../../schemas/faq.schema';
import { AppError } from '../../utils/appError.util';

@autoInjectable()
export class FaqService {
  private repo = AppDataSource.getRepository(Faq);

  async getAll(params?: {
    status?: FaqStatus;
    category?: string;
    search?: string;
    limit?: number;
    page?: number;
  }): Promise<[Faq[], number]> {
    const qb = this.repo.createQueryBuilder('faq');

    if (params?.status && (params.status as any) !== 'All') {
      qb.andWhere('faq.status = :status', { status: params.status });
    }

    if (params?.category && params.category !== 'All') {
      qb.andWhere('faq.category = :category', { category: params.category });
    }

    if (params?.search && params.search.trim()) {
      const term = `%${params.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(faq.question) LIKE :term OR LOWER(faq.answer) LIKE :term OR LOWER(faq.category) LIKE :term)',
        { term },
      );
    }

    qb.orderBy('faq.order', 'ASC').addOrderBy('faq.createdAt', 'ASC');

    if (params?.limit) {
      qb.take(params.limit);
      if (params.page && params.page > 1) {
        qb.skip((params.page - 1) * params.limit);
      }
    }

    return qb.getManyAndCount();
  }

  async getById(id: string): Promise<Faq> {
    const faq = await this.repo.findOne({ where: { id } });
    if (!faq) throw AppError.notFound(`FAQ ${id} not found`);
    return faq;
  }

  async create(dto: CreateFaqDto): Promise<Faq> {
    const faq = this.repo.create({
      question: dto.question,
      answer: dto.answer,
      category: dto.category || 'General',
      status: dto.status || FaqStatus.ACTIVE,
      order: dto.order || 0,
    });

    return this.repo.save(faq);
  }

  async update(id: string, dto: UpdateFaqDto): Promise<Faq> {
    const faq = await this.getById(id);

    if (dto.question !== undefined) faq.question = dto.question;
    if (dto.answer !== undefined) faq.answer = dto.answer;
    if (dto.category !== undefined) faq.category = dto.category;
    if (dto.status !== undefined) faq.status = dto.status;
    if (dto.order !== undefined) faq.order = dto.order;

    return this.repo.save(faq);
  }

  async delete(id: string): Promise<boolean> {
    const faq = await this.getById(id);
    await this.repo.remove(faq);
    return true;
  }

  async reorder(items: { id: string; order: number }[]): Promise<boolean> {
    if (!Array.isArray(items) || items.length === 0) return true;

    await AppDataSource.transaction(async (manager) => {
      for (const item of items) {
        await manager.update(Faq, { id: item.id }, { order: item.order });
      }
    });

    return true;
  }
}

