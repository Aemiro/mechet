import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '../../domains/partner/schedule';
import { ScheduleEntity } from '../../persistence/partner/schedule.entity';

export class ScheduleResponse {
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

  static fromEntity(scheduleEntity: ScheduleEntity): ScheduleResponse {
    const scheduleResponse = new ScheduleResponse();
    scheduleResponse.partnerId = scheduleEntity.partnerId;
    scheduleResponse.daysOfWeek = scheduleEntity.daysOfWeek;
    scheduleResponse.from = scheduleEntity.from;
    scheduleResponse.to = scheduleEntity.to;
    scheduleResponse.description = scheduleEntity.description;
    return scheduleResponse;
  }
  static fromDomain(schedule: Schedule): ScheduleResponse {
    const scheduleResponse = new ScheduleResponse();
    scheduleResponse.partnerId = schedule.partnerId;
    scheduleResponse.daysOfWeek = schedule.daysOfWeek;
    scheduleResponse.from = schedule.from;
    scheduleResponse.to = schedule.to;
    scheduleResponse.description = schedule.description;
    return scheduleResponse;
  }
}
