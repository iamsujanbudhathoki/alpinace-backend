import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Notification, NotificationType } from '../../entities/notification/Notification.entity';

export interface PaginatedNotifications {
  items: Notification[];
  total: number;
  limit: number;
  offset: number;
}

@autoInjectable()
export class NotificationService {
  private repo = AppDataSource.getRepository(Notification);

  async getAll(): Promise<Notification[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async getPaged(limit: number = 10, offset: number = 0): Promise<PaginatedNotifications> {
    const [items, total] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
    return { items, total, limit, offset };
  }

  async create(dto: {
    title: string;
    body: string;
    type: NotificationType;
    refId?: string;
  }): Promise<Notification> {
    const notification = this.repo.create({
      title: dto.title,
      body: dto.body,
      type: dto.type,
      refId: dto.refId,
      isRead: false,
    });
    return this.repo.save(notification);
  }

  async markAllRead(): Promise<boolean> {
    await this.repo.update({ isRead: false }, { isRead: true });
    return true;
  }

  async markRead(id: string): Promise<boolean> {
    await this.repo.update({ id }, { isRead: true });
    return true;
  }

  async delete(id: string): Promise<boolean> {
    await this.repo.delete({ id });
    return true;
  }
}
