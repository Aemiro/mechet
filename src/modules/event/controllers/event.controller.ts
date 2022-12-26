import {
  CreateEventCommand,
  UpdateEventCommand,
} from '@event/usecases/event/event.commands';
import { EventResponse } from '@event/usecases/event/event.response';
import { EventCommands } from '@event/usecases/event/event.usecase.commands';
import { EventQueries } from '@event/usecases/event/event.usecases.queries';
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

@Controller('events')
@ApiTags('events')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class EventController {
  constructor(private commands: EventCommands, private queries: EventQueries) {}

  @Get('get-event/:id')
  @ApiOkResponse({ type: EventResponse })
  async getEvent(@Param('id') id: string) {
    return this.queries.getEvent(id);
  }
  @Get('get-events')
  @ApiOkResponse({ type: EventResponse })
  async getEvents(@Query() query: CollectionQuery) {
    return this.queries.getEvents(query);
  }
  @Get('get-archived-events')
  @ApiOkResponse({ type: EventResponse })
  async getArchivedEvents(@Query() query: CollectionQuery) {
    return this.queries.getArchivedEvents(query);
  }

  @Post('create-event')
  @ApiOkResponse({ type: EventResponse })
  async createEvent(@Body() createEventCommand: CreateEventCommand) {
    return await this.commands.createEvent(createEventCommand);
  }

  @Put('update-event')
  @ApiOkResponse({ type: EventResponse })
  async UpdateEvent(
    @Param('id') id: string,
    @Body() updateEventCommand: UpdateEventCommand,
  ) {
    return await this.commands.UpdateEvent(id, updateEventCommand);
  }
  @Delete('delete-event/:id')
  @ApiOkResponse({ type: Boolean })
  async DeleteEvent(@Param('id') id: string) {
    return this.commands.DeleteEvent(id);
  }
  @Delete('archive-event/:id')
  @ApiOkResponse({ type: Boolean })
  async ArchiveEvent(@Param('id') id: string) {
    return await this.commands.ArchiveEvent(id);
  }
  @Post('restore-event/:id')
  @ApiOkResponse({ type: EventResponse })
  async RestoreEvent(@Param('id') id: string) {
    return await this.commands.RestoreEvent(id);
  }
}
