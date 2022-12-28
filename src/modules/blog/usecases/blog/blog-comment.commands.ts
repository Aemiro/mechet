import { BlogComment } from '@blog/domains/blog/blog-comment';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogCommentCommand {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  blogId: string;
  @ApiProperty()
  description: string;

  static fromCommands(command: CreateBlogCommentCommand): BlogComment {
    const blogComment = new BlogComment();
    blogComment.userId = command.userId;
    blogComment.blogId = command.blogId;
    blogComment.description = command.description;
    return blogComment;
  }
}

export class UpdateBlogCommentCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  blogId: string;
  @ApiProperty()
  description: string;

  static fromCommands(command: UpdateBlogCommentCommand): BlogComment {
    const blogComment = new BlogComment();
    blogComment.id = command.id;
    blogComment.userId = command.userId;
    blogComment.blogId = command.blogId;
    blogComment.description = command.description;
    return blogComment;
  }
}
