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
    status?: CategoryStatus;
    type?: CategoryType;
    search?: string;
    limit?: number;
    page?: number;
    parentId?: string | null;
    parentsOnly?: boolean;
  }): Promise<[Category[], number]> {
    const qb = this.repo.createQueryBuilder('cat');

    if (params?.status && (params.status as any) !== 'All') {
      qb.andWhere('cat.status = :status', { status: params.status });
    }

    if (params?.type && (params.type as any) !== 'All') {
      qb.andWhere('cat.type = :type', { type: params.type });
    }

    if (params?.parentsOnly) {
      qb.andWhere('cat.parentId IS NULL');
    } else if (params?.parentId !== undefined) {
      if (params.parentId === null || params.parentId === '') {
        qb.andWhere('cat.parentId IS NULL');
      } else {
        qb.andWhere('cat.parentId = :parentId', { parentId: params.parentId });
      }
    }

    if (params?.search && params.search.trim()) {
      const term = `%${params.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(cat.name) LIKE :term OR LOWER(cat.description) LIKE :term OR LOWER(cat.slug) LIKE :term)',
        { term },
      );
    }

    qb.orderBy('cat.menuOrder', 'ASC').addOrderBy('cat.createdAt', 'DESC');

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

  async validateResourceCategory(
    domain: CategoryType,
    categoryId?: string | null,
    subcategoryId?: string | null,
  ): Promise<{ category: Category | null; subcategory: Category | null }> {
    let category: Category | null = null;
    let subcategory: Category | null = null;

    if (categoryId) {
      category = await this.repo.findOne({ where: { id: categoryId } });
      if (!category) {
        throw AppError.notFound(`Selected category does not exist.`);
      }
      if (category.type !== domain) {
        throw AppError.badRequest(
          `Selected category '${category.name}' belongs to domain '${category.type}', but expected '${domain}'.`,
        );
      }
      if (category.parentId) {
        throw AppError.badRequest(
          `Selected category '${category.name}' is a subcategory. Please select a top-level parent category.`,
        );
      }
    }

    if (subcategoryId) {
      if (!categoryId) {
        throw AppError.badRequest(`A parent category must be selected before selecting a subcategory.`);
      }
      subcategory = await this.repo.findOne({ where: { id: subcategoryId } });
      if (!subcategory) {
        throw AppError.notFound(`Selected subcategory does not exist.`);
      }
      if (subcategory.parentId !== categoryId) {
        throw AppError.badRequest(
          `Selected subcategory '${subcategory.name}' does not belong to category '${category?.name}'.`,
        );
      }
      if (subcategory.type !== domain) {
        throw AppError.badRequest(
          `Subcategory '${subcategory.name}' belongs to domain '${subcategory.type}', but expected '${domain}'.`,
        );
      }
    }

    return { category, subcategory };
  }

  async getByType(type: CategoryType): Promise<Category[]> {
    const all = await this.repo.find({
      where: { type, status: CategoryStatus.ACTIVE },
      order: { menuOrder: 'ASC', name: 'ASC' },
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
      p.children = (childrenMap.get(p.id) || []).sort((a, b) => (a.menuOrder ?? 0) - (b.menuOrder ?? 0));
      return p;
    });
  }

  async getNavMenu(): Promise<Category[]> {
    const all = await this.repo.find({
      where: { status: CategoryStatus.ACTIVE, showInMenu: true },
      order: { menuOrder: 'ASC', name: 'ASC' },
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
      p.children = (childrenMap.get(p.id) || []).sort((a, b) => (a.menuOrder ?? 0) - (b.menuOrder ?? 0));
      return p;
    });
  }

  async reorderCategories(items: { id: string; menuOrder: number }[]): Promise<boolean> {
    if (!items || items.length === 0) return true;
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      for (const item of items) {
        await transactionalEntityManager.update(Category, { id: item.id }, { menuOrder: item.menuOrder });
      }
    });
    return true;
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

  private async validateCategoryHierarchy(
    categoryId: string | null,
    parentId: string | null,
  ): Promise<void> {
    if (!parentId) return;

    if (categoryId && parentId === categoryId) {
      throw AppError.badRequest('A category cannot be its own parent.');
    }

    const parentCategory = await this.repo.findOne({ where: { id: parentId } });
    if (!parentCategory) {
      throw AppError.notFound('Selected parent category does not exist.');
    }

    if (parentCategory.parentId) {
      throw AppError.badRequest(
        'Categories can only be nested up to 2 levels deep. Selected parent is already a subcategory.',
      );
    }

    if (categoryId) {
      const childCount = await this.repo.count({ where: { parentId: categoryId } });
      if (childCount > 0) {
        throw AppError.badRequest(
          'A category that has subcategories cannot be assigned a parent category.',
        );
      }
    }
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    if (dto.mediaId) {
      await this.mediaService.validateMediaExists(dto.mediaId);
    }

    if (dto.parentId) {
      await this.validateCategoryHierarchy(null, dto.parentId);
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
      showInMenu: dto.showInMenu !== undefined ? dto.showInMenu : true,
      menuOrder: dto.menuOrder !== undefined ? dto.menuOrder : 0,
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

    if (dto.parentId !== undefined) {
      const targetParentId = dto.parentId || null;
      if (targetParentId !== category.parentId) {
        await this.validateCategoryHierarchy(id, targetParentId);
      }
    }

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
    if (dto.showInMenu !== undefined) category.showInMenu = dto.showInMenu;
    if (dto.menuOrder !== undefined) category.menuOrder = dto.menuOrder;
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
