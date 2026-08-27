import { autoInjectable } from 'tsyringe';
import { isUUID } from 'class-validator';
import { AppDataSource } from '../../config/database.config';
import {
  Category,
  CategoryStatus,
  CategoryType,
} from '../../entities/category/Category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../schemas/category.schema';
import { AppError } from '../../utils/appError.util';
import { MediaService } from '../media/media.service';

@autoInjectable()
export class CategoryService {
  private repo = AppDataSource.getRepository(Category);

  constructor(private mediaService: MediaService = new MediaService()) {}

  async getAll(params?: {
    type?: CategoryType;
    search?: string;
    limit?: number;
    page?: number;
  }): Promise<[Category[], number]> {
    const qb = this.repo.createQueryBuilder('cat');

    if (params?.type && (params.type as any) !== 'All') {
      qb.andWhere('cat.type = :type', { type: params.type });
    }

    if (params?.search && params.search.trim()) {
      const term = `%${params.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(cat.name) LIKE :term OR LOWER(cat.description) LIKE :term OR LOWER(cat.slug) LIKE :term)',
        { term },
      );
    }

    qb.orderBy('cat.createdAt', 'DESC');

    if (params?.limit) {
      qb.take(params.limit);
      if (params.page && params.page > 1) {
        qb.skip((params.page - 1) * params.limit);
      }
    }

    const [items, count] = await qb.getManyAndCount();
    const resolved = await Promise.all(
      items.map((cat) => this.mediaService.resolveItemMedia(cat)),
    );
    return [resolved, count];
  }

  async getByType(type: CategoryType): Promise<Category[]> {
    const all = await this.repo.find({
      where: { type, status: CategoryStatus.ACTIVE },
      order: { name: 'ASC' },
    });

    const resolvedAll = await Promise.all(
      all.map((cat) => this.mediaService.resolveItemMedia(cat)),
    );

    const parents = resolvedAll.filter((c) => !c.parentId);
    const childrenMap = new Map<string, Category[]>();

    resolvedAll.forEach((c) => {
      if (c.parentId) {
        const list = childrenMap.get(c.parentId) || [];
        list.push(c);
        childrenMap.set(c.parentId, list);
      }
    });

    return parents.map((p) => {
      p.children = childrenMap.get(p.id) || [];
      return p;
    });
  }

  async getById(id: string): Promise<Category> {
    const item = await this.repo.findOne({ where: { id }, relations: ['children', 'parent'] });
    if (!item) throw AppError.notFound(`Category with ID ${id} not found`);
    return this.mediaService.resolveItemMedia(item);
  }

  async getByIdOrSlug(idOrSlug: string): Promise<Category> {
    const isUuid = isUUID(idOrSlug);

    let item: Category | null = null;
    if (isUuid) {
      item = await this.repo.findOne({ where: { id: idOrSlug }, relations: ['children', 'parent'] });
    }
    if (!item) {
      item = await this.repo.findOne({ where: { slug: idOrSlug }, relations: ['children', 'parent'] });
    }

    if (!item) throw AppError.notFound(`Category '${idOrSlug}' not found`);
    return this.mediaService.resolveItemMedia(item);
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    if (dto.mediaId) {
      await this.mediaService.validateMediaExists(dto.mediaId);
    }

    const rawSlug = dto.slug || dto.name;
    const slug = rawSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const existingSlug = await this.repo.findOne({ where: { slug } });
    if (existingSlug) {
      throw AppError.alreadyExists('Category with this slug already exists');
    }

    const existingName = await this.repo.findOne({ where: { name: dto.name.trim() } });
    if (existingName) {
      throw AppError.alreadyExists('Category with this name already exists');
    }

    const category = this.repo.create({
      name: dto.name.trim(),
      slug,
      type: dto.type,
      description: dto.description.trim(),
      status: dto.status,
      itemCount: 0,
      mediaId: dto.mediaId || null,
      parentId: dto.parentId || null,
    });
    const saved = await this.repo.save(category);
    return this.mediaService.resolveItemMedia(saved);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    if (dto.mediaId) {
      await this.mediaService.validateMediaExists(dto.mediaId);
    }

    const category = await this.getById(id);

    if (dto.slug !== undefined) {
      const newSlug = dto.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      if (newSlug !== category.slug) {
        const existingSlug = await this.repo.findOne({ where: { slug: newSlug } });
        if (existingSlug && existingSlug.id !== id) {
          throw AppError.alreadyExists('Category with this slug already exists');
        }
        category.slug = newSlug;
      }
    }

    if (dto.name !== undefined && dto.name.trim() !== category.name) {
      const trimmedName = dto.name.trim();
      const existingName = await this.repo.findOne({ where: { name: trimmedName } });
      if (existingName && existingName.id !== id) {
        throw AppError.alreadyExists('Category with this name already exists');
      }
      category.name = trimmedName;
    }

    if (dto.type) category.type = dto.type;
    if (dto.description !== undefined) category.description = dto.description.trim();
    if (dto.status) category.status = dto.status;
    if (dto.mediaId !== undefined) category.mediaId = dto.mediaId || null;
    if (dto.parentId !== undefined) category.parentId = dto.parentId || null;

    const saved = await this.repo.save(category);
    return this.mediaService.resolveItemMedia(saved);
  }

  async delete(id: string): Promise<boolean> {
    const category = await this.getById(id);
    await this.repo.remove(category);
    return true;
  }
}
