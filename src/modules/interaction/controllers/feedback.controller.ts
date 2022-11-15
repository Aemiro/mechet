import { CollectionQuery } from '@libs/collection-query/collection-query';
import { FeedbackResponse } from '@interaction/usecases/feedbacks/feedback.response';
import { CreateFeedbackCommand } from '@interaction/usecases/feedbacks/feedback.commands';
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
import { FeedbackCommands } from '@interaction/usecases/feedbacks/feedback.usecase.commands';
import { ApiPaginatedResponse } from '@libs/response-format/api-paginated-response';
import { FeedbackQuery } from '@interaction/usecases/feedbacks/feedback.usecase.queries';

@Controller('feedbacks')
@ApiTags('feedbacks')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class FeedbacksController {
  constructor(
    private command: FeedbackCommands,
    private feedbackQuery: FeedbackQuery,
  ) {}
  @Get('get-feedback/:id')
  @ApiOkResponse({ type: FeedbackResponse })
  async getFeedback(@Param('id') id: string) {
    return this.feedbackQuery.getFeedback(id);
  }
  @Get('get-feedbacks')
  @ApiPaginatedResponse(FeedbackResponse)
  async getFeedbacks(@Query() query: CollectionQuery) {
    return this.feedbackQuery.getFeedbacks(query);
  }
  @Post('create-feedback')
  @ApiOkResponse({ type: FeedbackResponse })
  async createFeedback(@Body() createFeedbackCommand: CreateFeedbackCommand) {
    return this.command.createFeedback(createFeedbackCommand);
  }
  @Delete('archive-feedback/:id')
  @ApiOkResponse({ type: Boolean })
  async archiveFeedback(@Param('id') id: string) {
    return this.command.archiveFeedback(id);
  }
  @Delete('delete-feedback/:id')
  @ApiOkResponse({ type: Boolean })
  async deleteFeedback(@Param('id') id: string) {
    return this.command.deleteFeedback(id);
  }
  @Post('restore-feedback/:id')
  @ApiOkResponse({ type: FeedbackResponse })
  async restoreFeedback(@Param('id') id: string) {
    return this.command.restoreFeedback(id);
  }
  @Get('get-archived-feedbacks')
  @ApiPaginatedResponse(FeedbackResponse)
  async getArchivedFeedbacks(@Query() query: CollectionQuery) {
    return this.feedbackQuery.getArchivedFeedbacks(query);
  }
}
