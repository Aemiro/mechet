import { Address } from '@libs/common/address';
import { AverageRate } from '@libs/common/average-rate';
import { Status } from '@libs/common/enums';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Branch } from '@partner/domains/partner/branch';
import { IsEnum } from 'class-validator';
import { Location } from '@libs/common/location';
import { ContactPerson } from '@libs/common/contact-person';

export class CreateBranchCommand {
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
  createdBy: string;

  static fromCommands(command: CreateBranchCommand): Branch {
    const branch = new Branch();
    branch.partnerId = command.partnerId;
    branch.name = command.name;
    branch.email = command.email;
    branch.phoneNumber = command.phoneNumber;
    branch.coverImage = command.coverImage;
    branch.about = command.about;
    branch.address = command.address;
    branch.location = command.location;
    branch.averageRate = command.averageRate;
    branch.contactPerson = command.contactPerson;
    branch.isMainBranch = command.isMainBranch;
    branch.createdBy = command.createdBy;
    return branch;
  }
}
export class UpdateBranchCommand {
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
  updatedBy: string;

  static fromCommands(command: UpdateBranchCommand): Branch {
    const branch = new Branch();
    branch.partnerId = command.partnerId;
    branch.name = command.name;
    branch.email = command.email;
    branch.phoneNumber = command.phoneNumber;
    branch.coverImage = command.coverImage;
    branch.about = command.about;
    branch.address = command.address;
    branch.location = command.location;
    branch.averageRate = command.averageRate;
    branch.contactPerson = command.contactPerson;
    branch.isMainBranch = command.isMainBranch;
    branch.updatedBy = command.updatedBy;
    return branch;
  }
}
