import { ECategory } from '@event/domains/e-category/e-category';
import { ECategoryEntity } from '@event/persistence/e-category/e-category.entity';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
export class ECategoryResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  coverImage: FileDto;

  static fromEntity(categoryEntity: ECategoryEntity): ECategoryResponse {
    const categoryResponse = new ECategoryResponse();
    categoryResponse.id = categoryEntity.id;
    categoryResponse.name = categoryEntity.name;
    categoryResponse.description = categoryEntity.description;
    categoryResponse.coverImage = categoryEntity.coverImage;
    return categoryResponse;
  }

  static fromDomain(category: ECategory): ECategoryResponse {
    const categoryResponse = new ECategoryResponse();
    categoryResponse.id = category.id;
    categoryResponse.name = category.name;
    categoryResponse.description = category.description;
    categoryResponse.coverImage = category.coverImage;
    return categoryResponse;
  }
}
