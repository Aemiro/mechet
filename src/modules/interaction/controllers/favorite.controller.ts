import { CreateFavoriteCommand } from '@interaction/usecases/favorites/favorite.command';
import { FavoriteResponse } from '@interaction/usecases/favorites/favorite.response';
import { FavoriteCommands } from '@interaction/usecases/favorites/favorite.usecases.commands';
import { FavoriteQueries } from '@interaction/usecases/favorites/favorite.usecases.queries';
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

@Controller('favorites')
@ApiTags('favorites')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class FavoriteController {
  constructor(
    private commands: FavoriteCommands,
    private queries: FavoriteQueries,
  ) {}
  @Get('get-favorite/:id')
  @ApiPaginatedResponse(FavoriteResponse)
  async getFavorite(@Param('id') id: string) {
    return this.queries.getFavorite(id);
  }
  @Get('get-favorites')
  @ApiPaginatedResponse(FavoriteResponse)
  async getFavorites(@Query() query: CollectionQuery) {
    return this.queries.getFavorites(query);
  }
  @Get('get-favorites/:userId')
  @ApiPaginatedResponse(FavoriteResponse)
  async getFavoritesByUser(
    @Param('userId') userId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.queries.getFavoritesByUser(userId, query);
  }
  @Get('get-favorites/:eventId')
  @ApiPaginatedResponse(FavoriteResponse)
  async getFavoritesByEvent(
    @Param('eventId') eventId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.queries.getFavoritesByEvent(eventId, query);
  }

  @Post('create-favorite')
  @ApiOkResponse({ type: FavoriteResponse })
  async createFavorite(@Body() command: CreateFavoriteCommand) {
    return await this.commands.createFavorite(command);
  }

  @Delete('remove-favorite/:id')
  @ApiOkResponse({ type: Boolean })
  async removeFavorite(@Param() id: string) {
    return await this.commands.removeFavorite(id);
  }
}
