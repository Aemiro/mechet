import { Address } from '@libs/common/address';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Gender, Roles } from '@libs/common/enums';
import { User } from '@user/domains/user/user';
import { Location } from '@libs/common/location';

export class CreateUserCommand {
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
  password: string;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsEnum(Roles, {
    each: true,
    message: `Role must be in [${Object.values(Roles).join(', ')}]`,
  })
  role: string[];
  createdBy: string;

  static fromCommands(command: CreateUserCommand): User {
    const userDomain: User = new User();
    userDomain.partnerId = command.partnerId;
    userDomain.branchId = command.branchId;
    userDomain.name = command.name;
    userDomain.email = command.email;
    userDomain.phoneNumber = command.phoneNumber;
    userDomain.gender = command.gender;
    userDomain.address = command.address;
    userDomain.location = command.location;
    userDomain.password = command.password;
    userDomain.role = command.role;
    userDomain.createdBy = command.createdBy;
    return userDomain;
  }
}
export class UpdateUserCommand {
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
  @IsEnum(Roles, {
    each: true,
    message: `Role must be in [${Object.values(Roles).join(', ')}]`,
  })
  role: string[];
  updatedBy: string;

  static fromCommands(command: UpdateUserCommand): User {
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

export class CreatePartenerUserCommand {
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
  password: string;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsEnum(Roles, {
    each: true,
    message: `Role must be in [${Object.values(Roles).join(', ')}]`,
  })
  role: string[];
  createdBy: string;

  static fromCommands(command: CreatePartenerUserCommand): User {
    const userDomain: User = new User();
    userDomain.partnerId = command.partnerId;
    userDomain.branchId = command.branchId;
    userDomain.name = command.name;
    userDomain.email = command.email;
    userDomain.phoneNumber = command.phoneNumber;
    userDomain.gender = command.gender;
    userDomain.address = command.address;
    userDomain.location = command.location;
    userDomain.password = command.password;
    userDomain.role = command.role;
    userDomain.createdBy = command.createdBy;
    return userDomain;
  }
}
