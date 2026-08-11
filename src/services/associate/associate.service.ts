import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Associate, AssociateStatus } from '../../entities/associate/Associate.entity';
import {
  CreateAssociateDto,
  UpdateAssociateDto,
} from '../../schemas/associate.schema';
import { AppError } from '../../utils/appError.util';

@autoInjectable()
export class AssociateService {
  private repo = AppDataSource.getRepository(Associate);

  async getAll(status?: AssociateStatus): Promise<Associate[]> {
    if (status) {
      return this.repo.find({
        where: { status },
        order: { order: 'ASC', createdAt: 'DESC' },
      });
    }
    return this.repo.find({ order: { order: 'ASC', createdAt: 'DESC' } });
  }

  async getById(id: string): Promise<Associate> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw AppError.notFound(`Associate ${id} not found`);
    return item;
  }

  async create(dto: CreateAssociateDto): Promise<Associate> {
    const associate = this.repo.create({
      name: dto.name,
      role: dto.role || 'Partner',
      company: dto.company || '',
      image: dto.image || '',
      websiteUrl: dto.websiteUrl || '',
      description: dto.description || '',
      category: dto.category || 'Partner',
      status: dto.status || AssociateStatus.ACTIVE,
      order: dto.order || 0,
    });

    return this.repo.save(associate);
  }

  async update(id: string, dto: UpdateAssociateDto): Promise<Associate> {
    const associate = await this.getById(id);

    if (dto.name !== undefined) associate.name = dto.name;
    if (dto.role !== undefined) associate.role = dto.role;
    if (dto.company !== undefined) associate.company = dto.company;
    if (dto.image !== undefined) associate.image = dto.image;
    if (dto.websiteUrl !== undefined) associate.websiteUrl = dto.websiteUrl;
    if (dto.description !== undefined) associate.description = dto.description;
    if (dto.category !== undefined) associate.category = dto.category;
    if (dto.status !== undefined) associate.status = dto.status;
    if (dto.order !== undefined) associate.order = dto.order;

    return this.repo.save(associate);
  }

  async delete(id: string): Promise<boolean> {
    const associate = await this.getById(id);
    await this.repo.remove(associate);
    return true;
  }
}
