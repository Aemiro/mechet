import { EventCategory } from '@event/domains/category/category';
import { EventCategoryEntity } from '@event/persistence/category/category.entity';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
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
