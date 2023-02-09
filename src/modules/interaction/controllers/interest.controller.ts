import { InterestQueries } from '@interaction/usecases/interests/intereset.usecases.queries';
import { CreateInterestCommand } from '@interaction/usecases/interests/interest.command';
import { InterestResponse } from '@interaction/usecases/interests/interest.response';
import { InterestCommands } from '@interaction/usecases/interests/interest.usecases.commands';
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

@Controller('interests')
@ApiTags('interests')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class InterestController {
  constructor(
    private commands: InterestCommands,
    private queries: InterestQueries,
  ) {}
  @Get('get-interest/:Id')
  @ApiPaginatedResponse(InterestResponse)
  async getInterest(@Param('id') id: string) {
    return this.queries.getInterest(id);
  }
  @Get('get-interests')
  @ApiPaginatedResponse(InterestResponse)
  async getInterests(@Query() query: CollectionQuery) {
    return this.queries.getInterests(query);
  }
  @Get('get-interests/:userId')
  @ApiPaginatedResponse(InterestResponse)
  async getIntersetsByUser(
    @Param('userId') userId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.queries.getIntersetsByUser(userId, query);
  }
  @Get('get-interests/:eventId')
  @ApiPaginatedResponse(InterestResponse)
  async getInterestsByEvent(
    @Param('eventId') eventId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.queries.getInterestsByEvent(eventId, query);
  }

  @Post('create-interest')
  @ApiOkResponse({ type: InterestResponse })
  async createInterest(@Body() command: CreateInterestCommand) {
    return await this.commands.createInterest(command);
  }

  @Delete('remove-interest/:id')
  @ApiOkResponse({ type: Boolean })
  async removeInterest(@Param() id: string) {
    return await this.commands.removeInterest(id);
  }
}
