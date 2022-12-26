import { CollectionQuery } from '@libs/collection-query/collection-query';
import { ApiPaginatedResponse } from '@libs/response-format/api-paginated-response';
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
import {
  CreatePCategoryCommand,
  UpdatePCategoryCommand,
} from '@partner/usecases/p-category/p-category.commands';
import { PCategoryResponse } from '@partner/usecases/p-category/p-category.response';
import { PCategoryCommands } from '@partner/usecases/p-category/p-category.usecases.commands';
import { PCategoryQueries } from '@partner/usecases/p-category/p-category.usecases.queries';

@Controller('parter-categories')
@ApiTags('parter-categories')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class PCategoryController {
  constructor(
    private commands: PCategoryCommands,
    private queries: PCategoryQueries,
  ) {}

  @Get('get-category/:id')
  @ApiOkResponse({ type: PCategoryResponse })
  async getCategory(@Param('id') id: string) {
    return this.queries.getCategory(id);
  }

  // @Get('get-archived-category/:id')
  // @ApiOkResponse({ type: CategoryResponse })
  // async getArchivedCategory(@Param('id') id: string) {
  //   return this.categoryQuery.getCategory(id);
  // }

  @Get('get-archived-categories')
  @ApiPaginatedResponse(PCategoryResponse)
  async getArchivedCategorys(@Query() query: CollectionQuery) {
    return this.queries.getArchivedCategories(query);
  }

  @Get('get-categories')
  @ApiPaginatedResponse(PCategoryResponse)
  async getCategorys(@Query() query: CollectionQuery) {
    return this.queries.fetchCategories(query);
  }

  @Post('create-category')
  @ApiOkResponse({ type: PCategoryResponse })
  async createCategory(@Body() createCategoryCommand: CreatePCategoryCommand) {
    return await this.commands.createCategory(createCategoryCommand);
  }

  @Put('updated-category')
  @ApiOkResponse({ type: PCategoryResponse })
  async updateCategoryr(
    @Param('id') id: string,
    @Body() updateCategoryCommand: UpdatePCategoryCommand,
  ) {
    return await this.commands.updateCategory(id, updateCategoryCommand);
  }

  @Delete('archive-category/:id')
  @ApiOkResponse({ type: Boolean })
  async archiveCategory(@Param('id') id: string) {
    return await this.commands.archiveCategory(id);
  }

  @Delete('delete-category/:id')
  @ApiOkResponse({ type: Boolean })
  async deleteCategory(@Param('id') id: string) {
    return await this.commands.deleteCategory(id);
  }

  @Post('restore-category/:id')
  @ApiOkResponse({ type: PCategoryResponse })
  async restoreCategory(@Param('id') id: string) {
    return await this.commands.restoreCategory(id);
  }
}
