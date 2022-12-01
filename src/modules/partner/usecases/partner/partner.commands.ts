import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Address } from 'nodemailer/lib/mailer';
import { Partner } from './../../domains/partner/partner';

enum Status {
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
  APPROVED = 'APPROVED',
}
export class CreatePartnerCommand {
  @ApiProperty()
  categoryId: string;
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

  static fromCommand(command: CreatePartnerCommand): Partner {
    const partner = new Partner();
    partner.categoryId = command.categoryId;
    partner.name = command.name;
    partner.email = command.email;
    partner.phoneNumber = command.phoneNumber;
    partner.coverImage = command.coverImage;
    partner.website = command.website;
    partner.logo = command.logo;
    partner.about = command.about;
    partner.registrationDate = command.registrationDate;
    partner.status = command.status;
    partner.address = command.address;
    // partner.location = command.location;
    partner.averageRate = command.averageRate;
    return partner;
  }
}
export class UpdatePartnerCommand {
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

  static fromCommand(command: UpdatePartnerCommand): Partner {
    const partner = new Partner();
    partner.id = command.id;
    partner.categoryId = command.categoryId;
    partner.name = command.name;
    partner.email = command.email;
    partner.phoneNumber = command.phoneNumber;
    partner.coverImage = command.coverImage;
    partner.website = command.website;
    partner.logo = command.logo;
    partner.about = command.about;
    partner.registrationDate = command.registrationDate;
    partner.status = command.status;
    partner.address = command.address;
    // partner.location = command.location;
    partner.averageRate = command.averageRate;
    return partner;
  }
}
