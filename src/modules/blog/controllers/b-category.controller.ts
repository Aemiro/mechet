import {
  CreateBCategoryCommand,
  UpdateBCategoryCommand,
} from '@blog/usecases/b-category/b-category.commands';
import { BCategoryResponse } from '@blog/usecases/b-category/b-category.response';
import { BCategoryQueries } from '@blog/usecases/b-category/b-category.usecase.queries';
import { BCategoryCommands } from '@blog/usecases/b-category/b-category.usecases.commands';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiExtraModels,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('blog-categories')
@ApiTags('blog-categories')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class BCategoryController {
  constructor(
    private commands: BCategoryCommands,
    private queries: BCategoryQueries,
  ) {}

  @Get('get-blog-category/:id')
  @ApiOkResponse({ type: BCategoryResponse })
  async getCategory(@Param('id') id: string) {
    return this.queries.getCategory(id);
  }
  @Get('get-blog-categories')
  @ApiOkResponse({ type: BCategoryResponse })
  async getCategories(@Query() query: CollectionQuery) {
    return this.queries.getCategories(query);
  }
  @Get('get-archved-blog-categories')
  @ApiOkResponse({ type: BCategoryResponse })
  async getArchivedCategories(@Query() query: CollectionQuery) {
    return this.queries.getArchivedCategories(query);
  }

  @Post('create-blog-category')
  @ApiOkResponse({ type: BCategoryResponse })
  async createCategory(@Body() createBCategoryCommand: CreateBCategoryCommand) {
    return await this.commands.createCategory(createBCategoryCommand);
  }
  @Put('update-blog-category')
  @ApiOkResponse({ type: BCategoryResponse })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateBCategoryCommand: UpdateBCategoryCommand,
  ) {
    return await this.commands.updateCategory(id, updateBCategoryCommand);
  }
  @Delete('delete-blog-category/:id')
  @ApiOkResponse({ type: Boolean })
  async DeleteCategory(@Param('id') id: string) {
    return this.commands.DeleteCategory(id);
  }
  @Delete('archive-blog-category/:id')
  @ApiOkResponse({ type: Boolean })
  async ArchiveCategory(@Param('id') id: string) {
    return this.commands.ArchiveCategory(id);
  }
  @Post('restore-blog-category')
  @ApiOkResponse({ type: BCategoryResponse })
  async RestoreCategory(@Param('id') id: string) {
    return await this.commands.RestoreCategory(id);
  }
}
