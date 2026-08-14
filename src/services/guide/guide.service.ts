import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import {
  Guide,
  GuideRole,
  GuideStatus,
} from '../../entities/guide/Guide.entity';
import { CreateGuideDto, UpdateGuideDto } from '../../schemas/guide.schema';
import { AppError } from '../../utils/appError.util';

@autoInjectable()
export class GuideService {
  private repo = AppDataSource.getRepository(Guide);

  async getAll(): Promise<Guide[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async getById(id: string): Promise<Guide> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw AppError.notFound(`Guide with ID ${id} not found`);
    return item;
  }

  async create(dto: CreateGuideDto): Promise<Guide> {
    const guide = this.repo.create({
      name: dto.name,
      role: dto.role,
      summitStats: dto.summitStats || '',
      certifications: dto.certifications || [],
      status: dto.status || GuideStatus.AVAILABLE,
      phone: dto.phone,
      email: dto.email,
      currentAssignment: dto.currentAssignment || undefined,
      avatarUrl: dto.avatarUrl,
    });
    return this.repo.save(guide);
  }

  async update(id: string, dto: UpdateGuideDto): Promise<Guide> {
    const guide = await this.getById(id);
    Object.assign(guide, dto);
    return this.repo.save(guide);
  }

  async delete(id: string): Promise<boolean> {
    const guide = await this.getById(id);
    await this.repo.remove(guide);
    return true;
  }
}
