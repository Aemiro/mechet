import { BlogComment } from '@blog/domains/blog/blog-comment';
import { BlogCommentEntity } from '@blog/persistence/blog/blog-comment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class BlogCommentResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  blogId: string;
  @ApiProperty()
  description: string;

  static fromEntity(blogCommentEntity: BlogCommentEntity): BlogCommentResponse {
    const blogCommentResponse = new BlogCommentResponse();
    blogCommentResponse.id = blogCommentEntity.id;
    blogCommentResponse.userId = blogCommentEntity.userId;
    blogCommentResponse.blogId = blogCommentEntity.blogId;
    blogCommentResponse.description = blogCommentEntity.description;
    return blogCommentResponse;
  }
  static fromDomain(blogComment: BlogComment): BlogCommentResponse {
    const blogCommentResponse = new BlogCommentResponse();
    blogCommentResponse.id = blogComment.id;
    blogCommentResponse.userId = blogComment.userId;
    blogCommentResponse.blogId = blogComment.blogId;
    blogCommentResponse.description = blogComment.description;
    return blogCommentResponse;
  }
}
