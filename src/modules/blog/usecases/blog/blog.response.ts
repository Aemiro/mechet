import { Blog } from '@blog/domains/blog/blog';
import { BlogEntity } from '@blog/persistence/blog/blog.entity';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
export class BlogResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  branchId: string;
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
  static fromEntity(blogEntity: BlogEntity): BlogResponse {
    const blogResponse = new BlogResponse();
    blogResponse.id = blogEntity.id;
    blogResponse.branchId = blogEntity.branchId;
    blogResponse.categoryId = blogEntity.categoryId;
    blogResponse.title = blogEntity.title;
    blogResponse.description = blogEntity.description;
    blogResponse.views = blogEntity.views;
    blogResponse.coverImage = blogEntity.coverImage;
    blogResponse.isPublished = blogEntity.isPublished;
    blogResponse.publishedDate = blogEntity.publishedDate;
    blogResponse.tags = blogEntity.tags;
    return blogResponse;
  }
  static fromDomain(blog: Blog): BlogResponse {
    const blogResponse = new BlogResponse();
    blogResponse.id = blog.id;
    blogResponse.branchId = blog.branchId;
    blogResponse.categoryId = blog.categoryId;
    blogResponse.title = blog.title;
    blogResponse.description = blog.description;
    blogResponse.views = blog.views;
    blogResponse.coverImage = blog.coverImage;
    blogResponse.isPublished = blog.isPublished;
    blogResponse.publishedDate = blog.publishedDate;
    blogResponse.tags = blog.tags;
    return blogResponse;
  }
}
