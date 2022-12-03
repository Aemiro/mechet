import { Address } from '@libs/common/address';
import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { Location } from '@libs/common/location';
import { ApiProperty } from '@nestjs/swagger';
import { Partner } from '@partner/domains/partner/partner';
import { IsEnum } from 'class-validator';

enum Status {
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
  APPROVED = 'APPROVED',
}
export class CreatePartnerCommand {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
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
  @IsEnum(Status, {
    message:
      'status method must be one of the three PENDING,BLOCKED or APPROVED with capital letters',
  })
  status: Status;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  location: Location;
  @ApiProperty()
  averageRate: AverageRate;

  static fromCommands(command: CreatePartnerCommand): Partner {
    const partner = new Partner();
    partner.name = command.name;
    partner.email = command.email;
    partner.password = command.password;
    partner.phoneNumber = command.phoneNumber;
    partner.coverImage = command.coverImage;
    partner.website = command.website;
    partner.logo = command.logo;
    partner.about = command.about;
    partner.registrationDate = command.registrationDate;
    partner.status = command.status;
    partner.address = command.address;
    partner.location = command.location;
    partner.averageRate = command.averageRate;
    return partner;
  }
}
export class UpdatePartnerCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
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
  @IsEnum(Status, {
    message:
      'status method must be one of the three PENDING,BLOCKED or APPROVED with capital letters',
  })
  status: Status;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  location: Location;
  @ApiProperty()
  averageRate: AverageRate;

  static fromCommands(command: UpdatePartnerCommand): Partner {
    const partner = new Partner();
    partner.id = command.id;
    partner.name = command.name;
    partner.email = command.email;
    partner.password = command.password;
    partner.phoneNumber = command.phoneNumber;
    partner.coverImage = command.coverImage;
    partner.website = command.website;
    partner.logo = command.logo;
    partner.about = command.about;
    partner.registrationDate = command.registrationDate;
    partner.status = command.status;
    partner.address = command.address;
    partner.location = command.location;
    partner.averageRate = command.averageRate;
    return partner;
  }
}
