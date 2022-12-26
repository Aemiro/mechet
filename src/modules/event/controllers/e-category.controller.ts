import {
  CreateECategoryCommand,
  UpdateECategoryCommand,
} from '@event/usecases/e-category/e-category.commands';
import { ECategoryResponse } from '@event/usecases/e-category/e-category.response';
import { ECategoryCommands } from '@event/usecases/e-category/e-category.usecases.commands';
import { CategoryQueries } from '@event/usecases/e-category/e-category.usecases.queries';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiExtraModels,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('event_categories')
@ApiTags('event_categories')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class ECategoryController {
  constructor(
    private commands: ECategoryCommands,
    private queries: CategoryQueries,
  ) {}

  @Get('get-event-category/:id')
  @ApiOkResponse({ type: ECategoryResponse })
  async getCategory(@Param('id') id: string) {
    return this.queries.getCategory(id);
  }
  @Get('get-event-categories')
  @ApiOkResponse({ type: ECategoryResponse })
  async getCategories(@Query() query: CollectionQuery) {
    return this.queries.getCategories(query);
  }
  @Get('get-archved-event-categories')
  @ApiOkResponse({ type: ECategoryResponse })
  async getArchivedCategories(@Query() query: CollectionQuery) {
    return this.queries.getArchivedCategories(query);
  }

  @Post('create-event-category')
  @ApiOkResponse({ type: ECategoryResponse })
  async createCategory(@Body() createECategoryCommand: CreateECategoryCommand) {
    return await this.commands.createCategory(createECategoryCommand);
  }
  @Put('update-event-category')
  @ApiOkResponse({ type: ECategoryResponse })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateECategoryCommand: UpdateECategoryCommand,
  ) {
    return await this.commands.updateCategory(id, updateECategoryCommand);
  }
  @Delete('delete-event-category/:id')
  @ApiOkResponse({ type: Boolean })
  async DeleteCategory(@Param('id') id: string) {
    return this.commands.DeleteCategory(id);
  }
  @Delete('archive-event-category/:id')
  @ApiOkResponse({ type: Boolean })
  async ArchiveCategory(@Param('id') id: string) {
    return this.commands.ArchiveCategory(id);
  }
  @Post('restore-event-category')
  @ApiOkResponse({ type: ECategoryResponse })
  async RestoreCategory(@Param('id') id: string) {
    return await this.commands.RestoreCategory(id);
  }
}
