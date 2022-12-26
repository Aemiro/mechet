import { ApiProperty } from '@nestjs/swagger';
import { PCategory } from '@partner/domains/p-category/p-category';
import { PCategoryEntity } from '@partner/persistence/p-category/p-category.entity';
export class PCategoryResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  createdBy: string;
  @ApiProperty()
  deletedAt: Date;
  @ApiProperty()
  deletedBy: string;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  updatedBy: string;

  static fromEntity(categoryEntity: PCategoryEntity): PCategoryResponse {
    const categoryResponse = new PCategoryResponse();
    categoryResponse.id = categoryEntity.id;
    categoryResponse.name = categoryEntity.name;
    categoryResponse.description = categoryEntity.description;
    categoryResponse.createdAt = categoryEntity.createdAt;
    categoryResponse.createdBy = categoryEntity.createdBy;
    categoryResponse.deletedAt = categoryEntity.deletedAt;
    categoryResponse.deletedBy = categoryEntity.deletedBy;
    categoryResponse.updatedAt = categoryEntity.updatedAt;
    categoryResponse.updatedBy = categoryEntity.updatedBy;
    return categoryResponse;
  }
  static fromDomain(category: PCategory): PCategoryResponse {
    const categoryResponse = new PCategoryResponse();
    categoryResponse.id = category.id;
    categoryResponse.name = category.name;
    categoryResponse.description = category.description;
    categoryResponse.createdAt = category.createdAt;
    categoryResponse.createdBy = category.createdBy;
    categoryResponse.deletedAt = category.deletedAt;
    categoryResponse.deletedBy = category.deletedBy;
    categoryResponse.updatedAt = category.updatedAt;
    categoryResponse.updatedBy = category.updatedBy;
    return categoryResponse;
  }
}
