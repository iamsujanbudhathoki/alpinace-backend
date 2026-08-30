import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { TeamMember, TeamMemberStatus } from '../../entities/team/TeamMember.entity';
import { CreateTeamMemberDto, UpdateTeamMemberDto, ReorderTeamMemberItemDto } from '../../schemas/team.schema';
import { TeamQueryParamsDto } from '../../schemas/query-params.schema';
import { applyBaseQueryParams } from '../../utils/query-builder.util';
import { AppError } from '../../utils/appError.util';
import { MediaService } from '../media/media.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditEntityType } from '../../constants/audit.constants';

@autoInjectable()
export class TeamService {
  private repo = AppDataSource.getRepository(TeamMember);

  constructor(
    private mediaService: MediaService = new MediaService(),
    private auditLogService: AuditLogService = new AuditLogService(),
  ) {}

  async getAll(params: TeamQueryParamsDto = {}): Promise<[TeamMember[], number]> {
    const qb = this.repo.createQueryBuilder('team');

    applyBaseQueryParams(qb, 'team', params, ['name', 'role', 'bio', 'experience']);

    const [items, count] = await qb.getManyAndCount();
    const resolved = await Promise.all(
      items.map((m) => this.mediaService.resolveItemMedia(m)),
    );
    return [resolved, count];
  }

  async getById(id: string): Promise<TeamMember> {
    const member = await this.repo.findOne({ where: { id } });
    if (!member) {
      throw AppError.notFound('Team member not found');
    }
    return this.mediaService.resolveItemMedia(member);
  }

  async create(dto: CreateTeamMemberDto): Promise<TeamMember> {
    if (dto.avatarMediaId) {
      await this.mediaService.validateMediaExists(dto.avatarMediaId);
    }

    let orderVal = dto.order;
    if (orderVal === undefined || orderVal === null) {
      const maxOrder = await this.repo.maximum('order');
      orderVal = (maxOrder || 0) + 1;
    }

    const member = this.repo.create({
      ...dto,
      order: orderVal,
      status: dto.status || TeamMemberStatus.ACTIVE,
    });

    const saved = await this.repo.save(member);
    await this.auditLogService.logCreate(AuditEntityType.TEAM, saved.id, saved);
    return this.mediaService.resolveItemMedia(saved);
  }

  async update(id: string, dto: UpdateTeamMemberDto): Promise<TeamMember> {
    if (dto.avatarMediaId) {
      await this.mediaService.validateMediaExists(dto.avatarMediaId);
    }

    const member = await this.getById(id);
    const oldState = { ...member };
    Object.assign(member, dto);
    const saved = await this.repo.save(member);
    await this.auditLogService.logUpdate(AuditEntityType.TEAM, saved.id, oldState, saved);
    return this.mediaService.resolveItemMedia(saved);
  }

  async delete(id: string): Promise<boolean> {
    const member = await this.getById(id);
    const oldState = { ...member };
    await this.repo.remove(member);
    await this.auditLogService.logDelete(AuditEntityType.TEAM, id, oldState);
    return true;
  }

  async reorder(items: ReorderTeamMemberItemDto[]): Promise<boolean> {
    await AppDataSource.transaction(async (manager) => {
      for (const item of items) {
        await manager.update(TeamMember, { id: item.id }, { order: item.order });
      }
    });
    await this.auditLogService.logOrdering(AuditEntityType.TEAM, items.length, null, items);
    return true;
  }
}
