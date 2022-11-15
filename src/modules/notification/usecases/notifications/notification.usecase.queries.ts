import { CollectionQuery } from '@libs/collection-query/collection-query';
import { FilterOperators } from '@libs/collection-query/filter_operators';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '@notification/persistence/notifications/notification.entity';
import { Repository } from 'typeorm';
import { NotificationResponse } from './notification.response';
@Injectable()
export class NotificationQuery {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}
  async getNotification(id: string): Promise<NotificationResponse> {
    const notification = await this.notificationRepository.find({
      where: { id: id },
    });
    if (!notification[0]) {
      throw new NotFoundException(`Notification not found with id ${id}`);
    }
    return NotificationResponse.fromEntity(notification[0]);
  }
  async getNotifications(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<NotificationResponse>> {
    const dataQuery = QueryConstructor.constructQuery<NotificationEntity>(
      this.notificationRepository,
      query,
    );
    const d = new DataResponseFormat<NotificationResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => NotificationResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getArchivedNotifications(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<NotificationResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<NotificationEntity>(
      this.notificationRepository,
      query,
    );
    dataQuery.withDeleted();
    const d = new DataResponseFormat<NotificationResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => NotificationResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
}
