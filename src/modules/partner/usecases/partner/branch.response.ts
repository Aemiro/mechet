import { Address } from '@libs/common/address';
import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@libs/common/location';
import { BranchEntity } from '@partner/persistence/partner/branch.entity';
import { Branch } from '@partner/domains/partner/branch';
import { ContactPerson } from '@libs/common/contact-person';

export class BranchResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  partnerId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  coverImage: FileDto;
  @ApiProperty()
  about: string;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  location: Location;
  @ApiProperty()
  isMainBranch: boolean;
  @ApiProperty()
  averageRate: AverageRate;
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

  static fromEntity(branchEntity: BranchEntity): BranchResponse {
    const branchResponse = new BranchResponse();
    branchResponse.id = branchEntity.id;
    branchResponse.partnerId = branchEntity.partnerId;
    branchResponse.name = branchEntity.name;
    branchResponse.email = branchEntity.email;
    branchResponse.phoneNumber = branchEntity.phoneNumber;
    branchResponse.coverImage = branchEntity.coverImage;
    branchResponse.about = branchEntity.about;
    branchResponse.address = branchEntity.address;
    branchResponse.location = branchEntity.location;
    branchResponse.averageRate = branchEntity.averageRate;
    branchResponse.contactPerson = branchEntity.contactPerson;
    branchResponse.isMainBranch = branchEntity.isMainBranch;
    branchResponse.createdAt = branchEntity.createdAt;
    branchResponse.createdBy = branchEntity.createdBy;
    branchResponse.updatedAt = branchEntity.updatedAt;
    branchResponse.updatedBy = branchEntity.updatedBy;
    branchResponse.deletedAt = branchEntity.deletedAt;
    branchResponse.deletedBy = branchEntity.deletedBy;
    return branchResponse;
  }

  static fromDomain(branch: Branch): BranchResponse {
    const branchResponse = new BranchResponse();
    branchResponse.id = branch.id;
    branchResponse.partnerId = branch.partnerId;
    branchResponse.name = branch.name;
    branchResponse.email = branch.email;
    branchResponse.phoneNumber = branch.phoneNumber;
    branchResponse.coverImage = branch.coverImage;
    branchResponse.about = branch.about;
    branchResponse.address = branch.address;
    branchResponse.location = branch.location;
    branchResponse.averageRate = branch.averageRate;
    branchResponse.contactPerson = branch.contactPerson;
    branchResponse.isMainBranch = branch.isMainBranch;
    branchResponse.createdAt = branch.createdAt;
    branchResponse.createdBy = branch.createdBy;
    branchResponse.updatedAt = branch.updatedAt;
    branchResponse.updatedBy = branch.updatedBy;
    branchResponse.deletedAt = branch.deletedAt;
    branchResponse.deletedBy = branch.deletedBy;
    return branchResponse;
  }
}
