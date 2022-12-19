import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { PartnerEntity } from '@partner/persistence/partner/partner.entity';
import { Partner } from '@partner/domains/partner/partner';
import { ContactPerson } from '@libs/common/contact-person';
import { Status } from '@libs/common/enums';
export class PartnerResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  website: string;
  @ApiProperty()
  logo: FileDto;
  @ApiProperty()
  about: string;
  @ApiProperty()
  status: Status;
  @ApiProperty()
  contactPerson: ContactPerson;
  @ApiProperty()
  createdBy?: string;
  @ApiProperty()
  updatedBy?: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt?: Date;
  @ApiProperty()
  deletedBy?: string;

  static fromEntity(partnerEntity: PartnerEntity): PartnerResponse {
    const partnerResponse = new PartnerResponse();
    partnerResponse.id = partnerEntity.id;
    partnerResponse.categoryId = partnerEntity.categoryId;
    partnerResponse.name = partnerEntity.name;
    partnerResponse.email = partnerEntity.email;
    partnerResponse.phoneNumber = partnerEntity.phoneNumber;
    partnerResponse.website = partnerEntity.website;
    partnerResponse.logo = partnerEntity.logo;
    partnerResponse.about = partnerEntity.about;
    partnerResponse.status = partnerEntity.status;
    partnerResponse.contactPerson = partnerEntity.contactPerson;
    partnerResponse.createdAt = partnerEntity.createdAt;
    partnerResponse.createdBy = partnerEntity.createdBy;
    partnerResponse.updatedAt = partnerEntity.updatedAt;
    partnerResponse.updatedBy = partnerEntity.updatedBy;
    partnerResponse.deletedAt = partnerEntity.deletedAt;
    partnerResponse.deletedBy = partnerEntity.deletedBy;
    return partnerResponse;
  }

  static fromDomain(partner: Partner): PartnerResponse {
    const partnerResponse = new PartnerResponse();
    partnerResponse.id = partner.id;
    partnerResponse.categoryId = partner.categoryId;
    partnerResponse.name = partner.name;
    partnerResponse.email = partner.email;
    partnerResponse.phoneNumber = partner.phoneNumber;
    partnerResponse.website = partner.website;
    partnerResponse.logo = partner.logo;
    partnerResponse.about = partner.about;
    partnerResponse.status = partner.status;
    partnerResponse.contactPerson = partner.contactPerson;
    partnerResponse.createdAt = partner.createdAt;
    partnerResponse.createdBy = partner.createdBy;
    partnerResponse.updatedAt = partner.updatedAt;
    partnerResponse.updatedBy = partner.updatedBy;
    partnerResponse.deletedAt = partner.deletedAt;
    partnerResponse.deletedBy = partner.deletedBy;
    return partnerResponse;
  }
}
