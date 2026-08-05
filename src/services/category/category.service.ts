import { autoInjectable } from 'tsyringe';
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

@autoInjectable()
export class CategoryService {
  private repo = AppDataSource.getRepository(Category);

  async getAll(): Promise<Category[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async getByType(type: CategoryType): Promise<Category[]> {
    return this.repo.find({
      where: { type, status: CategoryStatus.ACTIVE },
      order: { name: 'ASC' },
    });
  }

  async getById(id: string): Promise<Category> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw AppError.notFound(`Category with ID ${id} not found`);
    return item;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const slug = dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existing = await this.repo.findOne({ where: { slug } });
    if (existing)
      throw AppError.alreadyExists('Category with this name already exists');

    const category = this.repo.create({
      name: dto.name,
      slug,
      type: dto.type,
      description: dto.description,
      status: dto.status,
      itemCount: 0,
    });
    return this.repo.save(category);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.getById(id);

    if (dto.name && dto.name !== category.name) {
      category.name = dto.name;
      category.slug = dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (dto.type) category.type = dto.type;
    if (dto.description !== undefined) category.description = dto.description;
    if (dto.status) category.status = dto.status;

    return this.repo.save(category);
  }

  async delete(id: string): Promise<boolean> {
    const category = await this.getById(id);
    await this.repo.remove(category);
    return true;
  }
}
