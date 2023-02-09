import { AverageRate } from '@libs/common/average-rate';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from '@event/domains/event/event';
import { Location } from '@libs/common/location';
import { Address } from '@libs/common/address';

export class UpdateEventRate {
  eventId: string;
  rate: number;
}
export class CreateEventCommand {
  @ApiProperty()
  branchId: string;
  @ApiProperty()
  partnerId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  //@ApiProperty()
  views: number;
  @ApiProperty()
  isPublished: boolean;
  @ApiProperty()
  publishedDate: Date;
  @ApiProperty()
  from: Date;
  @ApiProperty()
  to: Date;
  //@ApiProperty()
  averageRate: AverageRate;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  location: Location;
  @ApiProperty()
  tags: string[];

  static fromCommands(command: CreateEventCommand): Event {
    const event = new Event();
    event.branchId = command.branchId;
    event.partnerId = command.partnerId;
    event.title = command.title;
    event.description = command.description;
    event.views = command.views;
    event.isPublished = command.isPublished;
    event.publishedDate = command.publishedDate;
    event.from = command.from;
    event.to = command.to;
    event.averageRate = command.averageRate;
    event.address = command.address;
    event.location = command.location;
    event.tags = command.tags;
    return event;
  }
}
export class UpdateEventCommand {
  @ApiProperty()
  id: string;
  // @ApiProperty()
  partnerId: string;
  // @ApiProperty()
  branchId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  //@ApiProperty()
  views: number;
  @ApiProperty()
  isPublished: boolean;
  @ApiProperty()
  publishedDate: Date;
  @ApiProperty()
  from: Date;
  @ApiProperty()
  to: Date;
  @ApiProperty()
  averageRate: AverageRate;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  location: Location;
  @ApiProperty()
  tags: string[];
  static fromCommands(command: UpdateEventCommand): Event {
    const event = new Event();
    event.id = command.id;
    event.branchId = command.branchId;
    event.partnerId = command.partnerId;
    event.title = command.title;
    event.description = command.description;
    event.views = command.views;
    event.isPublished = command.isPublished;
    event.publishedDate = command.publishedDate;
    event.from = command.from;
    event.to = command.to;
    event.averageRate = command.averageRate;
    event.address = command.address;
    event.location = command.location;
    event.tags = command.tags;
    return event;
  }
}
