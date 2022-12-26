import { ECategory } from '@event/domains/e-category/e-category';
import { ApiProperty } from '@nestjs/swagger';

export class CreateECategoryCommand {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;

  static fromCommands(command: CreateECategoryCommand): ECategory {
    const category = new ECategory();
    category.name = command.name;
    category.description = command.description;
    return category;
  }
}
export class UpdateECategoryCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;

  static fromCommands(command: UpdateECategoryCommand): ECategory {
    const category = new ECategory();
    category.id = command.id;
    category.name = command.name;
    category.description = command.description;
    return category;
  }
}
