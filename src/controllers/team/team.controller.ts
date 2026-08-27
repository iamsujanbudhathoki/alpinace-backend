import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  NoSecurity,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ApiResponse } from '../../interfaces/apiResponse.interface';
import { TeamMember, TeamMemberStatus } from '../../entities/team/TeamMember.entity';
import { TeamService } from '../../services/team/team.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto, ReorderTeamMembersDto } from '../../schemas/team.schema';
import { RequestValidator } from '../../middlewares/validator.middleware';
import { paginateResponse } from '../../utils/pageAndLimit';

@Route('teams')
@Tags('Teams & Leadership')
@Security('jwt', ['admin'])
export class TeamController extends Controller {
  constructor(private teamService: TeamService = new TeamService()) {
    super();
  }

  @Get('')
  @NoSecurity()
  async getAll(
    @Query() status?: TeamMemberStatus,
    @Query() search?: string,
    @Query() limit?: number,
    @Query() page?: number,
    @Query() sortBy?: string,
    @Query() sortOrder?: 'ASC' | 'DESC' | 'asc' | 'desc',
  ): Promise<ApiResponse<TeamMember[]>> {
    const dataTotalCount = await this.teamService.getAll({
      status,
      search,
      limit,
      page,
      sortBy,
      sortOrder,
    });
    const { data, pagination } = paginateResponse(dataTotalCount, limit, page);
    return { data, pagination, message: 'Team members retrieved successfully', success: true };
  }

  @Put('reorder')
  async reorder(@Body() body: ReorderTeamMembersDto): Promise<ApiResponse<boolean>> {
    const data = await this.teamService.reorder(body.items);
    return { data, message: 'Team members reordered successfully', success: true };
  }

  @Get('{id}')
  @NoSecurity()
  async getById(@Path() id: string): Promise<ApiResponse<TeamMember>> {
    const data = await this.teamService.getById(id);
    return { data, message: 'Team member retrieved successfully', success: true };
  }

  @Post('')
  @Middlewares(RequestValidator.validate(CreateTeamMemberDto))
  async create(@Body() body: CreateTeamMemberDto): Promise<ApiResponse<TeamMember>> {
    const data = await this.teamService.create(body);
    return { data, message: 'Team member created successfully', success: true };
  }

  @Put('{id}')
  @Middlewares(RequestValidator.validate(UpdateTeamMemberDto))
  async update(
    @Path() id: string,
    @Body() body: UpdateTeamMemberDto,
  ): Promise<ApiResponse<TeamMember>> {
    const data = await this.teamService.update(id, body);
    return { data, message: 'Team member updated successfully', success: true };
  }

  @Delete('{id}')
  async delete(@Path() id: string): Promise<ApiResponse<boolean>> {
    const data = await this.teamService.delete(id);
    return { data, message: 'Team member deleted successfully', success: true };
  }
}
