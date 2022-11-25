import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Blog } from '@blog/blog/domains/blog/blog';

export class CreateBlogCommand {
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  views: number;
  @ApiProperty()
  coverImage: FileDto;
  @ApiProperty()
  isPublished: boolean;
  @ApiProperty()
  publishedDate: Date;
  @ApiProperty()
  tags: string[];

  static fromCommand(command: CreateBlogCommand): Blog {
    const blog = new Blog();
    blog.categoryId = command.categoryId;
    blog.title = command.title;
    blog.description = command.description;
    blog.views = command.views;
    blog.coverImage = command.coverImage;
    blog.isPublished = command.isPublished;
    blog.publishedDate = command.publishedDate;
    blog.tags = command.tags;
    return blog;
  }
}
export class UpdateBlogCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  views: number;
  @ApiProperty()
  coverImage: FileDto;
  @ApiProperty()
  isPublished: boolean;
  @ApiProperty()
  publishedDate: Date;
  @ApiProperty()
  tags: string[];

  static fromCommand(command: UpdateBlogCommand): Blog {
    const blog = new Blog();
    blog.categoryId = command.categoryId;
    blog.title = command.title;
    blog.description = command.description;
    blog.views = command.views;
    blog.coverImage = command.coverImage;
    blog.isPublished = command.isPublished;
    blog.publishedDate = command.publishedDate;
    blog.tags = command.tags;
    return blog;
  }
}
