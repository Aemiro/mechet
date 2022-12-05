import { EventCategory } from '@event/domains/category/category';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventCategoryCommand {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  coverImage: FileDto;

  static fromCommand(command: CreateEventCategoryCommand): EventCategory {
    const eventCategory = new EventCategory();
    eventCategory.name = command.name;
    eventCategory.description = command.description;
    eventCategory.coverImage = command.coverImage;
    return eventCategory;
  }
}
export class UpdateEventCategoryCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  coverImage: FileDto;

  static fromCommand(command: UpdateEventCategoryCommand): EventCategory {
    const eventCategory = new EventCategory();
    eventCategory.id = command.description;
    eventCategory.name = command.name;
    eventCategory.description = command.description;
    eventCategory.coverImage = command.coverImage;
    return eventCategory;
  }
}
