import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../domains/partner/category';
import { CategoryEntity } from './../../persistence/partner/category.entity';
export class CategoryResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;

  static fromEntity(categoryEntity: CategoryEntity): CategoryResponse {
    const categoryResponse = new CategoryResponse();
    categoryResponse.id = categoryEntity.id;
    categoryResponse.name = categoryEntity.name;
    categoryResponse.description = categoryEntity.description;
    return categoryResponse;
  }
  static fromDomain(category: Category): CategoryResponse {
    const categoryResponse = new CategoryResponse();
    categoryResponse.id = category.id;
    categoryResponse.name = category.name;
    categoryResponse.description = category.description;
    return categoryResponse;
  }
}
