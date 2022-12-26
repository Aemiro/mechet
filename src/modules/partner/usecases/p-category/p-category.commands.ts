import { ApiProperty } from '@nestjs/swagger';
import { PCategory } from '@partner/domains/p-category/p-category';

export class CreatePCategoryCommand {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  createdBy: string;

  static fromCommands(command: CreatePCategoryCommand): PCategory {
    const category = new PCategory();
    category.name = command.name;
    category.description = command.description;
    category.createdBy = command.createdBy;
    return category;
  }
}
export class UpdatePCategoryCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  updatedBy: string;

  static fromCommands(command: UpdatePCategoryCommand): PCategory {
    const category = new PCategory();
    category.id = command.id;
    category.name = command.name;
    category.description = command.description;
    category.updatedBy = command.updatedBy;
    return category;
  }
}
