import { CreateFollowCommand } from '@interaction/usecases/follows/follow.commands';
import { FollowResponse } from '@interaction/usecases/follows/follow.response';
import { FollowCommands } from '@interaction/usecases/follows/follow.usecases.commands';
import { FollowQueries } from '@interaction/usecases/follows/follow.usecases.queries';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { ApiPaginatedResponse } from '@libs/response-format/api-paginated-response';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiExtraModels,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('follows')
@ApiTags('follows')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class FollowController {
  constructor(
    private commands: FollowCommands,
    private queries: FollowQueries,
  ) {}

  @Get('get-follower/:Id')
  @ApiPaginatedResponse(FollowResponse)
  async getFollower(@Param('id') id: string) {
    return this.queries.getFollower(id);
  }
  @Get('get-followers')
  @ApiPaginatedResponse(FollowResponse)
  async getFollwers(@Query() query: CollectionQuery) {
    return this.queries.getFollwers(query);
  }
  @Get('get-followers/:userId')
  @ApiPaginatedResponse(FollowResponse)
  async getFollowersByUser(
    @Param('userId') userId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.queries.getFollowersByUser(userId, query);
  }
  @Get('get-followers/:branchId')
  @ApiPaginatedResponse(FollowResponse)
  async getFollowersByBranch(
    @Param('branchId') branchId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.queries.getFollowersByBranch(branchId, query);
  }

  @Post('create-follow')
  @ApiOkResponse({ type: FollowResponse })
  async createFollow(@Body() command: CreateFollowCommand) {
    return await this.commands.createFollow(command);
  }

  @Delete('remove-follow/:id')
  @ApiOkResponse({ type: Boolean })
  async removeFollow(@Param() id: string) {
    return await this.commands.removeFollow(id);
  }
}
