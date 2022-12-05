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
  CreateCategoryCommand,
  UpdateCategoryCommand,
} from '@partner/usecases/category/category.commands';
import { CategoryResponse } from '@partner/usecases/category/category.response';
import { CategoryCommands } from '@partner/usecases/category/category.usecases.commands';
import { CategoryQueries } from '@partner/usecases/category/category.usecases.queries';

@Controller('categories')
@ApiTags('categories')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class CategoryController {
  constructor(
    private command: CategoryCommands,
    private categoryQuery: CategoryQueries,
  ) {}

  @Get('get-category/:id')
  @ApiOkResponse({ type: CategoryResponse })
  async getCategory(@Param('id') id: string) {
    return this.categoryQuery.getCategory(id);
  }

  @Get('get-archived-category/:id')
  @ApiOkResponse({ type: CategoryResponse })
  async getArchivedCategory(@Param('id') id: string) {
    return this.categoryQuery.getCategory(id);
  }

  @Get('get-archived-categories')
  @ApiPaginatedResponse(CategoryResponse)
  async getArchivedCategorys(@Query() query: CollectionQuery) {
    return this.categoryQuery.getArchivedCategories(query);
  }

  @Get('get-categories')
  @ApiPaginatedResponse(CategoryResponse)
  async getCategorys(@Query() query: CollectionQuery) {
    return this.categoryQuery.fetchCategories(query);
  }

  @Post('create-category')
  @ApiOkResponse({ type: CategoryResponse })
  async createCategory(@Body() createCategoryCommand: CreateCategoryCommand) {
    return await this.command.createCategory(createCategoryCommand);
  }

  @Put('updated-category')
  @ApiOkResponse({ type: CategoryResponse })
  async updateCategoryr(
    @Param('id') id: string,
    @Body() updateCategoryCommand: UpdateCategoryCommand,
  ) {
    return await this.command.updateCategory(id, updateCategoryCommand);
  }

  @Delete('archive-category/:id')
  @ApiOkResponse({ type: Boolean })
  async archiveCategory(@Param('id') id: string) {
    return await this.command.archiveCategory(id);
  }

  @Delete('delete-category/:id')
  @ApiOkResponse({ type: Boolean })
  async deleteCategory(@Param('id') id: string) {
    return await this.command.deleteCategory(id);
  }

  @Post('restore-category/:id')
  @ApiOkResponse({ type: CategoryResponse })
  async restoreCategory(@Param('id') id: string) {
    return await this.command.restoreCategory(id);
  }
}
