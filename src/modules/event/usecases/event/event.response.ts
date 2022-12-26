import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { EventEntity } from './../../persistence/event/event.entity';
import { Event } from '@event/domains/event/event';
import { Location } from '@libs/common/location';
import { Address } from '@libs/common/address';

export class EventResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  partnerId: string;
  @ApiProperty()
  branchId: string;
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

  static fromEntity(eventEntity: EventEntity): EventResponse {
    const eventResponse = new EventResponse();
    eventResponse.id = eventEntity.id;
    eventResponse.branchId = eventEntity.branchId;
    eventResponse.partnerId = eventEntity.partnerId;
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
    eventResponse.tags = eventEntity.tags;
    return eventResponse;
  }

  static fromDomain(event: Event): EventResponse {
    const eventResponse = new EventResponse();
    eventResponse.id = event.id;
    eventResponse.branchId = event.branchId;
    eventResponse.partnerId = event.partnerId;
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
    eventResponse.tags = event.tags;
    return eventResponse;
  }
}
