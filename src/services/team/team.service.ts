import { AppDataSource } from '../../config/database.config';
import { TeamMember, TeamMemberStatus } from '../../entities/team/TeamMember.entity';
import { CreateTeamMemberDto, UpdateTeamMemberDto, ReorderTeamMemberItemDto } from '../../schemas/team.schema';
import { TeamQueryParamsDto } from '../../schemas/query-params.schema';
import { applyBaseQueryParams } from '../../utils/query-builder.util';
import { AppError } from '../../utils/appError.util';

export class TeamService {
  private repo = AppDataSource.getRepository(TeamMember);

  async getAll(params: TeamQueryParamsDto = {}): Promise<[TeamMember[], number]> {
    const qb = this.repo.createQueryBuilder('team');

    applyBaseQueryParams(qb, 'team', params, ['name', 'role', 'bio', 'experience']);

    return await qb.getManyAndCount();
  }

  async getById(id: string): Promise<TeamMember> {
    const member = await this.repo.findOne({ where: { id } });
    if (!member) {
      throw AppError.notFound('Team member not found');
    }
    return member;
  }

  async create(dto: CreateTeamMemberDto): Promise<TeamMember> {
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

    return await this.repo.save(member);
  }

  async update(id: string, dto: UpdateTeamMemberDto): Promise<TeamMember> {
    const member = await this.getById(id);
    Object.assign(member, dto);
    return await this.repo.save(member);
  }

  async delete(id: string): Promise<boolean> {
    const member = await this.getById(id);
    await this.repo.remove(member);
    return true;
  }

  async reorder(items: ReorderTeamMemberItemDto[]): Promise<boolean> {
    await AppDataSource.transaction(async (manager) => {
      for (const item of items) {
        await manager.update(TeamMember, { id: item.id }, { order: item.order });
      }
    });
    return true;
  }
}
