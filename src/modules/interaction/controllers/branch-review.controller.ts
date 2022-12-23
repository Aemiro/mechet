import { CreateBranchReviewCommand } from '@interaction/usecases/user-interaction/branch-reviews/branch-review.commands';
import { BranchReviewResponse } from '@interaction/usecases/user-interaction/branch-reviews/branch-review.response';
import { BranchReviewCommands } from '@interaction/usecases/user-interaction/branch-reviews/branch-review.usecase.commands';
import { BranchReviewQueries } from '@interaction/usecases/user-interaction/branch-reviews/branch-review.usecase.queries';
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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiExtraModels,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('branch-reviews')
@ApiTags('branch-reviews')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class BranchReviewController {
  constructor(
    private commands: BranchReviewCommands,
    private queries: BranchReviewQueries,
  ) {}

  @Get('get-branch-review/:userId')
  @ApiPaginatedResponse(BranchReviewResponse)
  async getBranchReviewsByUser(
    @Param('userId') userId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.queries.getBranchReviewsByUser(userId, query);
  }

  @Post('add-branch-review')
  @ApiOkResponse({ type: BranchReviewResponse })
  async addBranchReview(@Body() command: CreateBranchReviewCommand) {
    return await this.commands.createBranchReview(command);
  }

  @Delete('remove-branch-review/:id')
  @ApiOkResponse({ type: Boolean })
  async removeBranchReview(@Param() id: string) {
    return await this.commands.removeBranchReview(id);
  }
}
