import { NotificationCommands } from './usecases/notifications/notification.usecase.commands';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NotificationEntity } from './persistence/notifications/notification.entity';
import { NotificationRepository } from './persistence/notifications/notification.repository';
import { NotificationQuery } from './usecases/notifications/notification.usecase.queries';
import { NotificationsController } from './controllers/notification.controller';
@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  providers: [NotificationCommands, NotificationRepository, NotificationQuery],
  controllers: [NotificationsController],
})
export class NotificationModule {}
