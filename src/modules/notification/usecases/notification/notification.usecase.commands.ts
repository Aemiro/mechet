import { NotificationResponse } from './notification.response';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateNotificationCommand,
  UpdateNotificationCommand,
} from './notification.commands';
import { NotificationRepository } from '@notification/persistence/notification/notification.repository';
@Injectable()
export class NotificationCommands {
  constructor(private notificationRepository: NotificationRepository) {}
  async createNotification(
    command: CreateNotificationCommand,
  ): Promise<NotificationResponse> {
    const notificationDomain = CreateNotificationCommand.fromCommand(command);
    console.log(notificationDomain);
    const notification = await this.notificationRepository.insert(
      notificationDomain,
    );
    return NotificationResponse.fromDomain(notification);
  }
  async updateNotification(
    command: UpdateNotificationCommand,
  ): Promise<NotificationResponse> {
    const notificationDomain = await this.notificationRepository.getById(
      command.id,
    );
    if (!notificationDomain) {
      throw new NotFoundException(
        `Notification not found with id ${command.id}`,
      );
    }
    notificationDomain.title = command.title;
    notificationDomain.body = command.body;
    notificationDomain.to = command.to;
    console.log(notificationDomain);
    const notification = await this.notificationRepository.update(
      notificationDomain,
    );
    return NotificationResponse.fromDomain(notification);
  }
  async archiveNotification(id: string): Promise<boolean> {
    const notificationDomain = await this.notificationRepository.getById(id);
    if (!notificationDomain) {
      throw new NotFoundException(`Notification not found with id ${id}`);
    }
    return await this.notificationRepository.archive(id);
  }
  async restoreNotification(id: string): Promise<NotificationResponse> {
    const notificationDomain = await this.notificationRepository.getById(
      id,
      true,
    );
    if (!notificationDomain) {
      throw new NotFoundException(`Notification not found with id ${id}`);
    }
    const r = await this.notificationRepository.restore(id);
    if (r) {
      notificationDomain.deletedAt = null;
    }
    return NotificationResponse.fromDomain(notificationDomain);
  }
  async deleteNotification(id: string): Promise<boolean> {
    const notificationDomain = await this.notificationRepository.getById(
      id,
      true,
    );
    if (!notificationDomain) {
      throw new NotFoundException(`Notification not found with id ${id}`);
    }
    return await this.notificationRepository.delete(id);
  }
}
