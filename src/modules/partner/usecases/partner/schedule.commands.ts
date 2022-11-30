import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from './../../domains/partner/schedule';

export class CreateScheduleCommand {
  @ApiProperty()
  partnerId: string;
  @ApiProperty()
  daysOfWeek: string;
  @ApiProperty()
  from: Date;
  @ApiProperty()
  to: Date;
  @ApiProperty()
  description: string;

  static fromCommand(command: CreateScheduleCommand): Schedule {
    const schedule = new Schedule();
    schedule.partnerId = command.partnerId;
    schedule.daysOfWeek = command.daysOfWeek;
    schedule.from = command.from;
    schedule.to = command.to;
    schedule.description = command.description;
    return schedule;
  }
}

export class UpdateScheduleCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  partnerId: string;
  @ApiProperty()
  daysOfWeek: string;
  @ApiProperty()
  from: Date;
  @ApiProperty()
  to: Date;
  @ApiProperty()
  description: string;

  static fromCommand(command: UpdateScheduleCommand): Schedule {
    const schedule = new Schedule();
    schedule.partnerId = command.partnerId;
    schedule.daysOfWeek = command.daysOfWeek;
    schedule.from = command.from;
    schedule.to = command.to;
    schedule.description = command.description;
    return schedule;
  }
}
