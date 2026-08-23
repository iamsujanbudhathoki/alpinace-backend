import {
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { Notification } from '../../entities/notification/Notification.entity';
import { NotificationService, PaginatedNotifications } from '../../services/notification/notification.service';

@Route('notifications')
@Tags('Notifications')
@Security('jwt', ['admin'])
export class NotificationController extends Controller {
  constructor(private svc: NotificationService = new NotificationService()) {
    super();
  }

  @Get('')
  async getAll(): Promise<ApiResponse<Notification[]>> {
    const data = await this.svc.getAll();
    return { data, message: 'Notifications retrieved successfully', success: true };
  }

  @Get('paged')
  async getPaged(
    @Query() limit: number = 10,
    @Query() offset: number = 0,
  ): Promise<ApiResponse<PaginatedNotifications>> {
    const data = await this.svc.getPaged(Number(limit), Number(offset));
    return { data, message: 'Notifications retrieved successfully', success: true };
  }

  @Get('unread-count')
  async getUnreadCount(): Promise<ApiResponse<number>> {
    const data = await this.svc.getUnreadCount();
    return { data, message: 'Unread notifications count retrieved', success: true };
  }

  @Put('read-all')
  async markAllRead(): Promise<ApiResponse<boolean>> {
    const data = await this.svc.markAllRead();
    return { data, message: 'All notifications marked as read', success: true };
  }

  @Put('{id}/read')
  async markRead(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.svc.markRead(id);
    return { data, message: 'Notification marked as read', success: true };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.svc.delete(id);
    return { data, message: 'Notification deleted', success: true };
  }
}
