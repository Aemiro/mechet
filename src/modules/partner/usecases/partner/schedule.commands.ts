import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Schedule } from './../../domains/partner/schedule';

export class CreateScheduleCommand {
  //@ApiProperty()
  branchId: string;
  @ApiProperty()
  daysOfWeek: string;
  @ApiProperty()
  startingTime: Date;
  @ApiProperty()
  endTime: Date;
  @ApiProperty()
  description: string;

  static fromCommands(command: CreateScheduleCommand): Schedule {
    const schedule = new Schedule();
    schedule.branchId = command.branchId;
    schedule.daysOfWeek = command.daysOfWeek;
    schedule.startingTime = command.startingTime;
    schedule.endTime = command.endTime;
    schedule.description = command.description;
    return schedule;
  }
}

export class UpdateScheduleCommand {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
  // @ApiProperty()
  branchId: string;
  @ApiProperty()
  daysOfWeek: string;
  @ApiProperty()
  startingTime: Date;
  @ApiProperty()
  endTime: Date;
  @ApiProperty()
  description: string;

  static fromCommands(command: UpdateScheduleCommand): Schedule {
    const schedule = new Schedule();
    schedule.id = command.id;
    schedule.branchId = command.branchId;
    schedule.daysOfWeek = command.daysOfWeek;
    schedule.startingTime = command.startingTime;
    schedule.endTime = command.endTime;
    schedule.description = command.description;
    return schedule;
  }
}
