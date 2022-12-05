import { BlogCategory } from '@blog/domains/category/category';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogCategoryCommand {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  coverImage: FileDto;

  static fromCommand(command: CreateBlogCategoryCommand): BlogCategory {
    const blog = new BlogCategory();
    blog.name = command.name;
    blog.description = command.description;
    blog.description = command.description;
    blog.coverImage = command.coverImage;
    return blog;
  }
}
export class UpdateBlogCategoryCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  coverImage: FileDto;
  static fromCommand(command: UpdateBlogCategoryCommand): BlogCategory {
    const blog = new BlogCategory();
    blog.id = command.id;
    blog.name = command.name;
    blog.description = command.description;
    blog.description = command.description;
    blog.coverImage = command.coverImage;
    return blog;
  }
}
