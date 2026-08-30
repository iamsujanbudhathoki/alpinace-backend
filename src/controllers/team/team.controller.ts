import {
  Controller,
  Get,
  NoSecurity,
  Path,
  Query,
  Route,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { TeamMemberStatus } from '../../entities/team/TeamMember.entity';
import { TeamService } from '../../services/team/team.service';
import { paginateResponse } from '../../utils/pageAndLimit';
import { PublicTeamMemberDto } from '../../dtos/public-response.dto';
import { toPublicTeamMember } from '../../utils/public-mapper.util';

@Route('teams')
@Tags('Teams Public')
export class TeamController extends Controller {
  constructor(private teamService: TeamService = new TeamService()) {
    super();
  }

  /**
   * Get public active team members.
   * Enforces status = ACTIVE for public requests.
   */
  @Get('')
  @NoSecurity()
  async getAll(
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
    @Query() sortBy?: string,
    @Query() sortOrder?: 'ASC' | 'DESC' | 'asc' | 'desc',
  ): Promise<ApiResponse<PublicTeamMemberDto[]>> {
    const [items, totalCount] = await this.teamService.getAll({
      status: TeamMemberStatus.ACTIVE,
      search,
      limit,
      page,
      sortBy,
      sortOrder,
    });
    const publicItems = items.map(toPublicTeamMember);
    const { data, pagination } = paginateResponse([publicItems, totalCount], limit, page);
    return { data, pagination, message: 'Team members retrieved successfully', success: true };
  }

  /**
   * Get public active team member by ID.
   */
  @Get('{id}')
  @NoSecurity()
  async getById(@Path() id: string): Promise<ApiResponse<PublicTeamMemberDto>> {
    const member = await this.teamService.getById(id);
    const data = toPublicTeamMember(member);
    return { data, message: 'Team member retrieved successfully', success: true };
  }
}
