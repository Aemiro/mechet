import { ContactPerson } from '@libs/common/contact-person';
import { Status } from '@libs/common/enums';
import { FileDto } from '@libs/common/file-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Partner } from '@partner/domains/partner/partner';
import { IsEnum } from 'class-validator';

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
  website: string;
  @ApiProperty()
  logo: FileDto;
  @ApiProperty()
  about: string;
  @ApiProperty()
  @IsEnum(Status, {
    message:
      'status method must be one of the three PENDING,REJECTED, BLOCKED or APPROVED with capital letters',
  })
  status: Status;
  @ApiProperty()
  contactPerson: ContactPerson;
  createdBy: string;

  static fromCommands(command: CreatePartnerCommand): Partner {
    const partner = new Partner();
    partner.categoryId = command.categoryId;
    partner.name = command.name;
    partner.email = command.email;
    partner.phoneNumber = command.phoneNumber;
    partner.website = command.website;
    partner.logo = command.logo;
    partner.about = command.about;
    partner.status = command.status;
    partner.contactPerson = command.contactPerson;
    partner.createdBy = command.createdBy;
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
  website: string;
  @ApiProperty()
  logo: FileDto;
  @ApiProperty()
  about: string;
  @ApiProperty()
  @IsEnum(Status, {
    message:
      'status method must be one of the three PENDING,REJECTED, BLOCKED or APPROVED with capital letters',
  })
  status: Status;
  @ApiProperty()
  contactPerson: ContactPerson;
  updatedBy: string;

  static fromCommands(command: UpdatePartnerCommand): Partner {
    const partner = new Partner();
    partner.id = command.id;
    partner.categoryId = command.categoryId;
    partner.name = command.name;
    partner.email = command.email;
    partner.phoneNumber = command.phoneNumber;
    partner.website = command.website;
    partner.logo = command.logo;
    partner.about = command.about;
    partner.status = command.status;
    partner.contactPerson = command.contactPerson;
    partner.updatedBy = command.updatedBy;
    return partner;
  }
}
