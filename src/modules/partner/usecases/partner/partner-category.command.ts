import { ApiProperty } from '@nestjs/swagger';
import { PartnerCategory } from '@partner/domains/partner/partner-category';
export class CreatePartnerCategoryCommand {
  @ApiProperty()
  partnerId: string;
  @ApiProperty()
  categoryId: string;

  static fromCommands(command: CreatePartnerCategoryCommand): PartnerCategory {
    const partnerCategory = new PartnerCategory();
    partnerCategory.partnerId = command.partnerId;
    partnerCategory.categoryId = command.categoryId;
    return partnerCategory;
  }
}
export class UpdatePartnerCategoryCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  partnerId: string;
  @ApiProperty()
  categoryId: string;

  static fromCommands(command: UpdatePartnerCategoryCommand): PartnerCategory {
    const partnerCategory = new PartnerCategory();
    partnerCategory.id = command.id;
    partnerCategory.partnerId = command.partnerId;
    partnerCategory.categoryId = command.categoryId;
    return partnerCategory;
  }
}
