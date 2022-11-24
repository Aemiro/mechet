import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Notification } from '@notification/notification/domains/notification/notification';

export class CreateNotificationCommand {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  body: string;
  @ApiProperty()
  @IsNotEmpty()
  to: string;
  static fromCommand(command: CreateNotificationCommand): Notification {
    const notification = new Notification();
    notification.title = command.title;
    notification.body = command.body;
    notification.to = command.to;
    return notification;
  }
}

export class UpdateNotificationCommand {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  body: string;
  @ApiProperty()
  @IsNotEmpty()
  to: string;
  static fromCommand(command: UpdateNotificationCommand): Notification {
    const notification = new Notification();
    notification.id = command.id;
    notification.title = command.title;
    notification.body = command.body;
    notification.to = command.to;
    return notification;
  }
}
