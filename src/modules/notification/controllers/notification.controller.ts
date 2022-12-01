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
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@libs/response-format/api-paginated-response';
import {
  CreateNotificationCommand,
  UpdateNotificationCommand,
} from '../usecases/notification/notification.commands';
import { NotificationResponse } from '../usecases/notification/notification.response';
import { NotificationCommands } from '../usecases/notification/notification.usecase.commands';
import { NotificationQuery } from '../usecases/notification/notification.usecase.queries';

@Controller('notifications')
@ApiTags('notifications')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class NotificationsController {
  constructor(
    private command: NotificationCommands,
    private notificationQuery: NotificationQuery,
  ) {}
  @Get('get-notification/:id')
  @ApiOkResponse({ type: NotificationResponse })
  async getNotification(@Param('id') id: string) {
    return this.notificationQuery.getNotification(id);
  }
  @Get('get-notifications')
  @ApiPaginatedResponse(NotificationResponse)
  async getNotifications(@Query() query: CollectionQuery) {
    return this.notificationQuery.getNotifications(query);
  }
  @Post('create-notification')
  @ApiOkResponse({ type: NotificationResponse })
  async createNotification(
    @Body() createNotificationCommand: CreateNotificationCommand,
  ) {
    return this.command.createNotification(createNotificationCommand);
  }
  @Put('update-notification')
  @ApiOkResponse({ type: NotificationResponse })
  async updateNotification(
    @Body() updateNotificationCommand: UpdateNotificationCommand,
  ) {
    return this.command.updateNotification(updateNotificationCommand);
  }
  @Delete('archive-notification/:id')
  @ApiOkResponse({ type: Boolean })
  async archiveNotification(@Param('id') id: string) {
    return this.command.archiveNotification(id);
  }
  @Delete('delete-notification/:id')
  @ApiOkResponse({ type: Boolean })
  async deleteNotification(@Param('id') id: string) {
    return this.command.deleteNotification(id);
  }
  @Post('restore-notification/:id')
  @ApiOkResponse({ type: NotificationResponse })
  async restoreNotification(@Param('id') id: string) {
    return this.command.restoreNotification(id);
  }
  @Get('get-archived-notifications')
  @ApiPaginatedResponse(NotificationResponse)
  async getArchivedNotifications(@Query() query: CollectionQuery) {
    return this.notificationQuery.getArchivedNotifications(query);
  }
}
