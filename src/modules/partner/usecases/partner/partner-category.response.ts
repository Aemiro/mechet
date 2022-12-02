import { ApiProperty } from '@nestjs/swagger';
import { PartnerCategory } from '@partner/domains/partner/partner-category';
import { PartnerCategoryEntity } from '@partner/persistence/partner/partner-category.entity';

export class PartnerCategoryResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  partnerId: string;
  @ApiProperty()
  categoryId: string;

  static fromEntity(
    partnerCategoryEntity: PartnerCategoryEntity,
  ): PartnerCategoryResponse {
    const partnerCategoryResponse = new PartnerCategoryResponse();
    partnerCategoryResponse.id = partnerCategoryEntity.id;
    partnerCategoryResponse.partnerId = partnerCategoryEntity.partnerId;
    partnerCategoryResponse.categoryId = partnerCategoryEntity.categoryId;
    return partnerCategoryResponse;
  }
  static fromdomain(partnerCategory: PartnerCategory): PartnerCategoryResponse {
    const partnerCategoryResponse = new PartnerCategoryResponse();
    partnerCategoryResponse.id = partnerCategory.id;
    partnerCategoryResponse.partnerId = partnerCategory.partnerId;
    partnerCategoryResponse.categoryId = partnerCategory.categoryId;
    return partnerCategoryResponse;
  }
}
