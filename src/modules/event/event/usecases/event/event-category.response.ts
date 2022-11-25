import { EventCategory } from '@event/event/domains/event/event-category';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { EventCategoryEntity } from './../../persistence/event/event-category.entity';
export class EventCategoryResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  coverImage: FileDto;

  static fromEntity(
    eventCategoryEntity: EventCategoryEntity,
  ): EventCategoryResponse {
    const eventCategoryResponse = new EventCategoryResponse();
    eventCategoryResponse.id = eventCategoryEntity.description;
    eventCategoryResponse.name = eventCategoryEntity.name;
    eventCategoryResponse.description = eventCategoryEntity.description;
    eventCategoryResponse.coverImage = eventCategoryEntity.coverImage;
    return eventCategoryResponse;
  }

  static fromDomain(eventCategory: EventCategory): EventCategoryResponse {
    const eventCategoryResponse = new EventCategoryResponse();
    eventCategoryResponse.id = eventCategory.description;
    eventCategoryResponse.name = eventCategory.name;
    eventCategoryResponse.description = eventCategory.description;
    eventCategoryResponse.coverImage = eventCategory.coverImage;
    return eventCategoryResponse;
  }
}
