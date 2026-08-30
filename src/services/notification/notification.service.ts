import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Notification, NotificationType } from '../../entities/notification/Notification.entity';

export interface PaginatedNotificationResponse {
  items: Notification[];
  total: number;
  unreadCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedNotifications {
  items: Notification[];
  total: number;
  unreadCount: number;
  limit: number;
  offset: number;
}

@autoInjectable()
export class NotificationService {
  private repo = AppDataSource.getRepository(Notification);

  async getAllPaginated(params?: {
    page?: number;
    limit?: number;
    isRead?: boolean;
    type?: NotificationType;
  }): Promise<PaginatedNotificationResponse> {
    const qb = this.repo.createQueryBuilder('n');

    if (params?.isRead !== undefined) {
      qb.andWhere('n.isRead = :isRead', { isRead: params.isRead });
    }

    if (params?.type) {
      qb.andWhere('n.type = :type', { type: params.type });
    }

    qb.orderBy('n.createdAt', 'DESC');

    const limit = params?.limit && params.limit > 0 ? params.limit : 10;
    const page = params?.page && params.page > 0 ? params.page : 1;

    qb.take(limit).skip((page - 1) * limit);

    const [items, total] = await qb.getManyAndCount();
    const unreadCount = await this.repo.count({ where: { isRead: false } });
    const totalPages = Math.ceil(total / limit) || 1;

    return { items, total, unreadCount, page, limit, totalPages };
  }

  async getPaged(limit: number = 10, offset: number = 0): Promise<PaginatedNotifications> {
    const [items, total] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
    const unreadCount = await this.repo.count({ where: { isRead: false } });
    return { items, total, unreadCount, limit, offset };
  }

  async getUnreadCount(): Promise<number> {
    return this.repo.count({ where: { isRead: false } });
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
