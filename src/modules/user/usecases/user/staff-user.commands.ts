import { Address } from '@libs/common/address';
import { Gender } from '@libs/common/enums';
import { Location } from '@libs/common/location';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@user/domains/user/user';
import { IsNotEmpty, IsEmail, IsEnum, IsArray } from 'class-validator';

export class CreateStaffUSerCommand {
  //@ApiProperty()
  partnerId: string;
  //@ApiProperty()
  branchId: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'someone@gmail.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '+251911111111',
  })
  @IsNotEmpty()
  phoneNumber: string;
  @ApiProperty({
    enum: Gender,
  })
  @IsEnum(Gender, {
    message: 'User Gender must be either male or female',
  })
  gender: string;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  location: Location;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  role: string[];
  createdBy: string;

  static fromCommands(command: CreateStaffUSerCommand): User {
    const userDomain: User = new User();
    userDomain.partnerId = command.partnerId;
    userDomain.branchId = command.branchId;
    userDomain.name = command.name;
    userDomain.email = command.email;
    userDomain.phoneNumber = command.phoneNumber;
    userDomain.gender = command.gender;
    userDomain.address = command.address;
    userDomain.location = command.location;
    userDomain.role = command.role;
    userDomain.createdBy = command.createdBy;
    return userDomain;
  }
}
export class UpdateSatffUserCommand {
  @ApiProperty({
    example: 'd02dd06f-2a30-4ed8-a2a0-75c683e3092e',
  })
  @IsNotEmpty()
  id: string;
  // @ApiProperty()
  partnerId: string;
  //@ApiProperty()
  branchId: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'someone@gmail.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '+251911111111',
  })
  @IsNotEmpty()
  phoneNumber: string;
  @ApiProperty()
  @IsEnum(Gender, {
    message: 'User Gender must be either male or female',
  })
  gender: string;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  location: Location;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  role: string[];
  updatedBy: string;

  static fromCommands(command: UpdateSatffUserCommand): User {
    const userDomain: User = new User();
    userDomain.id = command.id;
    userDomain.partnerId = command.partnerId;
    userDomain.branchId = command.branchId;
    userDomain.name = command.name;
    userDomain.email = command.email;
    userDomain.phoneNumber = command.phoneNumber;
    userDomain.gender = command.gender;
    userDomain.address = command.address;
    userDomain.location = command.location;
    userDomain.role = command.role;
    userDomain.updatedBy = command.updatedBy;
    return userDomain;
  }
}
