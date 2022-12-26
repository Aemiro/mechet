import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '../../domains/partner/schedule';
import { ScheduleEntity } from '../../persistence/partner/schedule.entity';

export class ScheduleResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  branchId: string;
  @ApiProperty()
  daysOfWeek: string;
  @ApiProperty()
  startingTime: Date;
  @ApiProperty()
  endTime: Date;
  @ApiProperty()
  description: string;

  static fromEntity(scheduleEntity: ScheduleEntity): ScheduleResponse {
    const scheduleResponse = new ScheduleResponse();
    scheduleResponse.id = scheduleEntity.id;
    scheduleResponse.branchId = scheduleEntity.branchId;
    scheduleResponse.daysOfWeek = scheduleEntity.daysOfWeek;
    scheduleResponse.startingTime = scheduleEntity.startingTime;
    scheduleResponse.endTime = scheduleEntity.endTime;
    scheduleResponse.description = scheduleEntity.description;
    scheduleResponse.id = scheduleEntity.id;
    return scheduleResponse;
  }
  static fromDomain(schedule: Schedule): ScheduleResponse {
    const scheduleResponse = new ScheduleResponse();
    scheduleResponse.id = schedule.id;
    scheduleResponse.branchId = schedule.branchId;
    scheduleResponse.daysOfWeek = schedule.daysOfWeek;
    scheduleResponse.startingTime = schedule.startingTime;
    scheduleResponse.endTime = schedule.endTime;
    scheduleResponse.description = schedule.description;
    return scheduleResponse;
  }
}
