import { Address } from '@libs/common/address';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from '@libs/common/enums';
import { User } from '@user/user/domains/user/user';

export class CreateUserCommand {
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
  password: string;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  role: string[];

  static fromCommand(command: CreateUserCommand): User {
    const userDomain: User = new User();
    userDomain.name = command.name;
    userDomain.email = command.email;
    userDomain.phoneNumber = command.phoneNumber;
    userDomain.gender = command.gender;
    userDomain.address = command.address;
    userDomain.password = command.password;
    userDomain.role = command.role;
    return userDomain;
  }
}
export class UpdateUserCommand {
  @ApiProperty({
    example: 'd02dd06f-2a30-4ed8-a2a0-75c683e3092e',
  })
  @IsNotEmpty()
  id: string;
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
  @IsArray()
  @IsNotEmpty()
  role: string[];

  static fromCommand(command: UpdateUserCommand): User {
    const userDomain: User = new User();
    userDomain.name = command.name;
    userDomain.email = command.email;
    userDomain.phoneNumber = command.phoneNumber;
    userDomain.gender = command.gender;
    userDomain.address = command.address;
    userDomain.role = command.role;
    return userDomain;
  }
}
