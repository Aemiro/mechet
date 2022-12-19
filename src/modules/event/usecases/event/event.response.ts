import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'nodemailer/lib/mailer';
import { EventEntity } from './../../persistence/event/event.entity';
import { Event } from '@event/domains/event/event';
import { Location } from '@libs/common/location';

export class EventResponse {
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
  numOfInterestedUser: number;
  @ApiProperty()
  tags: string[];

  static fromEntity(eventEntity: EventEntity): EventResponse {
    const eventResponse = new EventResponse();
    eventResponse.id = eventEntity.id;
    eventResponse.categoryId = eventEntity.categoryId;
    eventResponse.title = eventEntity.title;
    eventResponse.description = eventEntity.description;
    eventResponse.views = eventEntity.views;
    eventResponse.coverImage = eventEntity.coverImage;
    eventResponse.isPublished = eventEntity.isPublished;
    eventResponse.publishedDate = eventEntity.publishedDate;
    eventResponse.from = eventEntity.from;
    eventResponse.to = eventEntity.to;
    eventResponse.averageRate = eventEntity.averageRate;
    eventResponse.address = eventEntity.address;
    eventResponse.location = eventEntity.location;
    eventResponse.numOfInterestedUser = eventEntity.numOfInterestedUser;
    eventResponse.tags = eventEntity.tags;
    return eventResponse;
  }

  static fromDomain(event: Event): EventResponse {
    const eventResponse = new EventResponse();
    eventResponse.id = event.id;
    eventResponse.categoryId = event.categoryId;
    eventResponse.title = event.title;
    eventResponse.description = event.description;
    eventResponse.views = event.views;
    eventResponse.coverImage = event.coverImage;
    eventResponse.isPublished = event.isPublished;
    eventResponse.publishedDate = event.publishedDate;
    eventResponse.from = event.from;
    eventResponse.to = event.to;
    eventResponse.averageRate = event.averageRate;
    eventResponse.address = event.address;
    eventResponse.location = event.location;
    eventResponse.numOfInterestedUser = event.numOfInterestedUser;
    eventResponse.tags = event.tags;
    return eventResponse;
  }
}
