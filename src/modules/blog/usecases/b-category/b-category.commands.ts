import { BCategory } from '@blog/domains/b-category/b-category';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBCategoryCommand {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  coverImage: FileDto;

  static fromCommands(command: CreateBCategoryCommand): BCategory {
    const category = new BCategory();
    category.name = command.name;
    category.description = command.description;
    category.description = command.description;
    category.coverImage = command.coverImage;
    return category;
  }
}
export class UpdateBCategoryCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  coverImage: FileDto;
  static fromCommands(command: UpdateBCategoryCommand): BCategory {
    const category = new BCategory();
    category.id = command.id;
    category.name = command.name;
    category.description = command.description;
    category.description = command.description;
    category.coverImage = command.coverImage;
    return category;
  }
}
