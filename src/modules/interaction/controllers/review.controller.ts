import { CollectionQuery } from '@libs/collection-query/collection-query';
import { ReviewResponse } from '@interaction/usecases/reviews/review.response';
import { CreateReviewCommand } from '@interaction/usecases/reviews/review.commands';
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
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewCommands } from '@interaction/usecases/reviews/review.usecase.commands';
import { ApiPaginatedResponse } from '@libs/response-format/api-paginated-response';
import { ReviewQuery } from '@interaction/usecases/reviews/review.usecase.queries';

@Controller('reviews')
@ApiTags('reviews')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class ReviewsController {
  constructor(
    private command: ReviewCommands,
    private reviewQuery: ReviewQuery,
  ) {}
  @Get('get-review/:id')
  @ApiOkResponse({ type: ReviewResponse })
  async getReview(@Param('id') id: string) {
    return this.reviewQuery.getReview(id);
  }
  @Get('get-reviews')
  @ApiPaginatedResponse(ReviewResponse)
  async getReviews(@Query() query: CollectionQuery) {
    return this.reviewQuery.getReviews(query);
  }
  @Post('create-review')
  @ApiOkResponse({ type: ReviewResponse })
  async createReview(@Body() createReviewCommand: CreateReviewCommand) {
    return this.command.createReview(createReviewCommand);
  }
  @Delete('archive-review/:id')
  @ApiOkResponse({ type: Boolean })
  async archiveReview(@Param('id') id: string) {
    return this.command.archiveReview(id);
  }
  @Delete('delete-review/:id')
  @ApiOkResponse({ type: Boolean })
  async deleteReview(@Param('id') id: string) {
    return this.command.deleteReview(id);
  }
  @Post('restore-review/:id')
  @ApiOkResponse({ type: ReviewResponse })
  async restoreReview(@Param('id') id: string) {
    return this.command.restoreReview(id);
  }
  @Get('get-archived-reviews')
  @ApiPaginatedResponse(ReviewResponse)
  async getArchivedReviews(@Query() query: CollectionQuery) {
    return this.reviewQuery.getArchivedReviews(query);
  }
}
