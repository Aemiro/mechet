import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notification.controller';
import { NotificationEntity } from './persistence/notification/notification.entity';
import { NotificationRepository } from './persistence/notification/notification.repository';
import { NotificationCommands } from './usecases/notification/notification.usecase.commands';
import { NotificationQuery } from './usecases/notification/notification.usecase.queries';
@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  providers: [NotificationCommands, NotificationRepository, NotificationQuery],
  controllers: [NotificationsController],
})
export class NotificationModule {}
