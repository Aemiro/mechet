import { ApiProperty } from '@nestjs/swagger';
import { Category } from './../../domains/partner/category';

export class CreateCategoryCommand {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;

  static fromCommands(command: CreateCategoryCommand): Category {
    const category = new Category();
    category.name = command.name;
    category.description = command.description;
    return category;
  }
}
export class UpdateCategoryCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;

  static fromCommands(command: UpdateCategoryCommand): Category {
    const category = new Category();
    category.id = command.id;
    category.name = command.name;
    category.description = command.description;
    return category;
  }
}
