import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '@notification/notification/domains/notification/notification';
import { INotificationRepository } from '@notification/notification/domains/notification/notification.repository.interface';
import { Repository } from 'typeorm';
import { NotificationEntity } from './notification.entity';
@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  async insert(notification: Notification): Promise<Notification> {
    const notificationEntity = this.toNotificationEntity(notification);
    console.log(notificationEntity);
    const result = await this.notificationRepository.save(notificationEntity);
    return result ? this.toNotification(result) : null;
  }
  async update(notification: Notification): Promise<Notification> {
    const notificationEntity = this.toNotificationEntity(notification);
    const result = await this.notificationRepository.save(notificationEntity);
    return result ? this.toNotification(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.notificationRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!notifications.length) {
      return null;
    }
    return notifications.map((user) => this.toNotification(user));
  }
  async getById(id: string, withDeleted = false): Promise<Notification> {
    const notification = await this.notificationRepository.find({
      where: { id: id },
      withDeleted: withDeleted,
    });
    if (!notification[0]) {
      return null;
    }
    return this.toNotification(notification[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.notificationRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.notificationRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }

  toNotification(notificationEntity: NotificationEntity): Notification {
    const notification = new Notification();
    notification.id = notificationEntity.id;
    notification.title = notificationEntity.title;
    notification.body = notificationEntity.body;
    notification.to = notificationEntity.to;
    notification.createdBy = notificationEntity.createdBy;
    notification.updatedBy = notificationEntity.updatedBy;
    notification.deletedBy = notificationEntity.deletedBy;
    notification.createdAt = notificationEntity.createdAt;
    notification.updatedAt = notificationEntity.updatedAt;
    notification.deletedAt = notificationEntity.deletedAt;
    return notification;
  }
  toNotificationEntity(notification: Notification): NotificationEntity {
    const notificationEntity = new NotificationEntity();
    notificationEntity.id = notification.id;
    notificationEntity.title = notification.title;
    notificationEntity.body = notification.body;
    notificationEntity.to = notification.to;
    notificationEntity.createdBy = notification.createdBy;
    notificationEntity.updatedBy = notification.updatedBy;
    notificationEntity.deletedBy = notification.deletedBy;
    notificationEntity.createdAt = notification.createdAt;
    notificationEntity.updatedAt = notification.updatedAt;
    notificationEntity.deletedAt = notification.deletedAt;
    return notificationEntity;
  }
}
