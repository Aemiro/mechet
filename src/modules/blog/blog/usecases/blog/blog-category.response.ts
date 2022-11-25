import { BlogCategory } from '@blog/blog/domains/blog/bolg-category';
import { BlogCategoryEntity } from '@blog/blog/persistence/blog/blog-category.entity';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';

export class BlogCategoryResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  coverImage: FileDto;
  static fromEntity(
    blogCategoryEntity: BlogCategoryEntity,
  ): BlogCategoryResponse {
    const blogCategoryResponse = new BlogCategoryResponse();
    blogCategoryResponse.id = blogCategoryEntity.id;
    blogCategoryResponse.name = blogCategoryEntity.name;
    blogCategoryResponse.description = blogCategoryEntity.description;
    blogCategoryResponse.coverImage = blogCategoryEntity.coverImage;
    return blogCategoryResponse;
  }
  static fromDomain(blogCategory: BlogCategory): BlogCategoryResponse {
    const blogCategoryResponse = new BlogCategoryResponse();
    blogCategoryResponse.id = blogCategory.id;
    blogCategoryResponse.name = blogCategory.name;
    blogCategoryResponse.description = blogCategory.description;
    blogCategoryResponse.coverImage = blogCategory.coverImage;
    return blogCategoryResponse;
  }
}
