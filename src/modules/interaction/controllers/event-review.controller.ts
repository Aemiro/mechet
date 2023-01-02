import { CreateEventReviewCommand } from '@interaction/usecases/user-interaction/event-reviews/event-review.commands';
import { EventReviewResponse } from '@interaction/usecases/user-interaction/event-reviews/event-review.response';
import { EventReviewCommands } from '@interaction/usecases/user-interaction/event-reviews/event-review.usecase.commands';
import { EventReviewQueries } from '@interaction/usecases/user-interaction/event-reviews/event-review.usecase.queries';
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

@Controller('event-reviews')
@ApiTags('event-reviews')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class EventReviewController {
  constructor(
    private commands: EventReviewCommands,
    private queries: EventReviewQueries,
  ) {}
  @Get('get-event-review/:id')
  @ApiPaginatedResponse(EventReviewResponse)
  async getEventReview(@Param('id') id: string) {
    return this.queries.getEventReview(id);
  }
  @Get('get-event-reviews')
  @ApiPaginatedResponse(EventReviewResponse)
  async getEventReviews(@Query() query: CollectionQuery) {
    return this.queries.getEventReviews(query);
  }
  @Get('get-event-reviews/:userId')
  @ApiPaginatedResponse(EventReviewResponse)
  async getEventReviewsByUser(
    @Param('userId') userId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.queries.getEventReviewsByUser(userId, query);
  }
  @Get('get-event-reviews/:eventId')
  @ApiPaginatedResponse(EventReviewResponse)
  async getEventReviewsByEvent(
    @Param('eventId') eventId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.queries.getEventReviewsByEvent(eventId, query);
  }

  @Post('create-event-review')
  @ApiOkResponse({ type: EventReviewResponse })
  async createEventReview(@Body() command: CreateEventReviewCommand) {
    return await this.commands.createEventReview(command);
  }

  @Delete('remove-event-review/:id')
  @ApiOkResponse({ type: Boolean })
  async removeEventReview(@Param('id') id: string) {
    return await this.commands.removeEventReview(id);
  }
}
