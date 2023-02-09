import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Blog } from '@blog/domains/blog/blog';

export class CreateBlogCommand {
  @ApiProperty()
  branchId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  //@ApiProperty()
  views: number;
  //@ApiProperty()
  coverImage: FileDto;
  @ApiProperty()
  isPublished: boolean;
  //@ApiProperty()
  publishedDate: Date;
  @ApiProperty()
  tags: string[];
  createdBy: string;

  static fromCommands(command: CreateBlogCommand): Blog {
    const blog = new Blog();
    blog.branchId = command.branchId;
    blog.title = command.title;
    blog.description = command.description;
    blog.views = command.views;
    blog.coverImage = command.coverImage;
    blog.isPublished = command.isPublished;
    blog.publishedDate = command.publishedDate;
    blog.tags = command.tags;
    blog.createdBy = command.createdBy;
    return blog;
  }
}
export class UpdateBlogCommand {
  @ApiProperty()
  id: string;
  // @ApiProperty()
  branchId: string;
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
  updatedBy: string;

  static fromCommands(command: UpdateBlogCommand): Blog {
    const blog = new Blog();
    blog.id = command.id;
    blog.branchId = command.branchId;
    blog.title = command.title;
    blog.description = command.description;
    blog.views = command.views;
    blog.coverImage = command.coverImage;
    blog.isPublished = command.isPublished;
    blog.publishedDate = command.publishedDate;
    blog.tags = command.tags;
    blog.updatedBy = command.updatedBy;
    return blog;
  }
}
