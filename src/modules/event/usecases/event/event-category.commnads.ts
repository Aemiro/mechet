import { EventCategory } from '@event/domains/event/event-category';
import { ApiProperty } from '@nestjs/swagger';
export class CreateEventCategoryCommand {
  @ApiProperty()
  eventId: string;
  @ApiProperty()
  categoryId: string;

  static fromCommands(command: CreateEventCategoryCommand): EventCategory {
    const eventCategory = new EventCategory();
    eventCategory.eventId = command.eventId;
    eventCategory.categoryId = command.categoryId;
    return eventCategory;
  }
}
export class UpdateEventCategoryCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  eventId: string;
  @ApiProperty()
  categoryId: string;

  static fromCommands(command: UpdateEventCategoryCommand): EventCategory {
    const eventCategory = new EventCategory();
    eventCategory.id = command.id;
    eventCategory.eventId = command.eventId;
    eventCategory.categoryId = command.categoryId;
    return eventCategory;
  }
}
