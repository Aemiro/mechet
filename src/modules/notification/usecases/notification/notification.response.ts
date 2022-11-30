import { ApiProperty } from '@nestjs/swagger';
import { NotificationEntity } from '@notification/persistence/notification/notification.entity';
import { Notification } from '@notification/domains/notification/notification';
export class NotificationResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  body: string;
  @ApiProperty()
  to: string;
  @ApiProperty()
  createdBy?: string;
  @ApiProperty()
  updatedBy?: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt?: Date;
  @ApiProperty()
  deletedBy?: string;
  static fromEntity(
    notificationEntity: NotificationEntity,
  ): NotificationResponse {
    const notificationResponse = new NotificationResponse();
    notificationResponse.id = notificationEntity.id;
    notificationResponse.title = notificationEntity.title;
    notificationResponse.to = notificationEntity.to;
    notificationResponse.body = notificationEntity.body;
    notificationResponse.createdBy = notificationEntity.createdBy;
    notificationResponse.updatedBy = notificationEntity.updatedBy;
    notificationResponse.deletedBy = notificationEntity.deletedBy;
    notificationResponse.createdAt = notificationEntity.createdAt;
    notificationResponse.updatedAt = notificationEntity.updatedAt;
    notificationResponse.deletedAt = notificationEntity.deletedAt;
    return notificationResponse;
  }
  static fromDomain(notification: Notification): NotificationResponse {
    const notificationResponse = new NotificationResponse();
    notificationResponse.id = notification.id;
    notificationResponse.title = notification.title;
    notificationResponse.to = notification.to;
    notificationResponse.body = notification.body;
    notificationResponse.createdBy = notification.createdBy;
    notificationResponse.updatedBy = notification.updatedBy;
    notificationResponse.deletedBy = notification.deletedBy;
    notificationResponse.createdAt = notification.createdAt;
    notificationResponse.updatedAt = notification.updatedAt;
    notificationResponse.deletedAt = notification.deletedAt;
    return notificationResponse;
  }
}
