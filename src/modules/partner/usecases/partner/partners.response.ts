import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@libs/common/address';
import { Location } from '@libs/common/location';
import { PartnerEntity } from '@partner/persistence/partner/partner.entity';
import { Partner } from '@partner/domains/partner/partner';
export class PartnerResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  coverImage: FileDto;
  @ApiProperty()
  website: string;
  @ApiProperty()
  logo: FileDto;
  @ApiProperty()
  about: string;
  @ApiProperty()
  registrationDate: Date;
  @ApiProperty()
  status: string;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  location: Location;
  @ApiProperty()
  averageRate: AverageRate;
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
    partnerResponse.name = partnerEntity.name;
    partnerResponse.email = partnerEntity.email;
    partnerResponse.phoneNumber = partnerEntity.phoneNumber;
    partnerResponse.coverImage = partnerEntity.coverImage;
    partnerResponse.website = partnerEntity.website;
    partnerResponse.logo = partnerEntity.logo;
    partnerResponse.about = partnerEntity.about;
    partnerResponse.registrationDate = partnerEntity.registrationDate;
    partnerResponse.status = partnerEntity.status;
    partnerResponse.address = partnerEntity.address;
    partnerResponse.location = partnerEntity.location;
    partnerResponse.averageRate = partnerEntity.averageRate;
    return partnerResponse;
  }

  static fromDomain(partner: Partner): PartnerResponse {
    const partnerResponse = new PartnerResponse();
    partnerResponse.id = partner.id;
    partnerResponse.name = partner.name;
    partnerResponse.email = partner.email;
    partnerResponse.phoneNumber = partner.phoneNumber;
    partnerResponse.coverImage = partner.coverImage;
    partnerResponse.website = partner.website;
    partnerResponse.logo = partner.logo;
    partnerResponse.about = partner.about;
    partnerResponse.registrationDate = partner.registrationDate;
    partnerResponse.status = partner.status;
    partnerResponse.address = partner.address;
    partnerResponse.location = partner.location;
    partnerResponse.averageRate = partner.averageRate;
    return partnerResponse;
  }
}
