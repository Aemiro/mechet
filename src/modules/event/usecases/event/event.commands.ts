import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'nodemailer/lib/mailer';
import { Event } from '@event/domains/event/event';
import { Location } from '@libs/common/location';

export class CreateEventCommand {
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  views: number;
  @ApiProperty()
  coverImage: FileDto;
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
  numOfInterestedUser: number;
  @ApiProperty()
  tags: string[];

  static fromCommand(command: CreateEventCommand): Event {
    const event = new Event();
    event.categoryId = command.categoryId;
    event.title = command.title;
    event.description = command.description;
    event.views = command.views;
    event.coverImage = command.coverImage;
    event.isPublished = command.isPublished;
    event.publishedDate = command.publishedDate;
    event.from = command.from;
    event.to = command.to;
    event.averageRate = command.averageRate;
    event.address = command.address;
    event.location = command.location;
    event.numOfInterestedUser = command.numOfInterestedUser;
    event.tags = command.tags;
    return event;
  }
}
export class UpdateEventCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  views: number;
  @ApiProperty()
  coverImage: FileDto;
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
  static fromCommand(command: UpdateEventCommand): Event {
    const event = new Event();
    event.id = command.id;
    event.categoryId = command.categoryId;
    event.title = command.title;
    event.description = command.description;
    event.views = command.views;
    event.coverImage = command.coverImage;
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
