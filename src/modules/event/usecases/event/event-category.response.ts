import { EventCategory } from '@event/domains/event/event-category';
import { EventCategoryEntity } from '@event/persistence/event/event-category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class EventCategoryResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  eventId: string;
  @ApiProperty()
  categoryId: string;

  static fromEntity(
    eventCategoryEntity: EventCategoryEntity,
  ): EventCategoryResponse {
    const eventCategoryResponse = new EventCategoryResponse();
    eventCategoryResponse.id = eventCategoryEntity.id;
    eventCategoryResponse.eventId = eventCategoryEntity.eventId;
    eventCategoryResponse.categoryId = eventCategoryEntity.categoryId;
    return eventCategoryResponse;
  }

  static fromDomain(eventCategory: EventCategory): EventCategoryResponse {
    const eventCategoryResponse = new EventCategoryResponse();
    eventCategoryResponse.id = eventCategory.id;
    eventCategoryResponse.eventId = eventCategory.eventId;
    eventCategoryResponse.categoryId = eventCategory.categoryId;
    return eventCategoryResponse;
  }
}
