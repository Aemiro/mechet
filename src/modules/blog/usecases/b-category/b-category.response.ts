import { BCategory } from '@blog/domains/b-category/b-category';
import { BCategoryEntity } from '@blog/persistence/b-category/b-category.entity';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';

export class BCategoryResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  coverImage: FileDto;
  static fromEntity(categoryEntity: BCategoryEntity): BCategoryResponse {
    const categoryResponse = new BCategoryResponse();
    categoryResponse.id = categoryEntity.id;
    categoryResponse.name = categoryEntity.name;
    categoryResponse.description = categoryEntity.description;
    categoryResponse.coverImage = categoryEntity.coverImage;
    return categoryResponse;
  }
  static fromDomain(category: BCategory): BCategoryResponse {
    const categoryResponse = new BCategoryResponse();
    categoryResponse.id = category.id;
    categoryResponse.name = category.name;
    categoryResponse.description = category.description;
    categoryResponse.coverImage = category.coverImage;
    return categoryResponse;
  }
}
