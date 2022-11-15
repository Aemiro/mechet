import { UserEntity } from '@user/persistence/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@libs/common/address';
import { User } from '@user/domains/users/user';
import { FileDto } from '@libs/common/file-dto';

export class UserResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  enabled: boolean;
  @ApiProperty()
  profileImage: FileDto;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  role: string[];
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
  static fromEntity(userEntity: UserEntity): UserResponse {
    const userResponse = new UserResponse();
    userResponse.id = userEntity.id;
    userResponse.name = userEntity.name;
    userResponse.email = userEntity.email;
    userResponse.phoneNumber = userEntity.phoneNumber;
    userResponse.gender = userEntity.gender;
    userResponse.enabled = userEntity.enabled;
    userResponse.profileImage = userEntity.profileImage;
    userResponse.address = userEntity.address;
    userResponse.role = userEntity.role;
    userResponse.createdBy = userEntity.createdBy;
    userResponse.updatedBy = userEntity.updatedBy;
    userResponse.deletedBy = userEntity.deletedBy;
    userResponse.createdAt = userEntity.createdAt;
    userResponse.updatedAt = userEntity.updatedAt;
    userResponse.deletedAt = userEntity.deletedAt;
    return userResponse;
  }
  static fromDomain(user: User): UserResponse {
    const userResponse = new UserResponse();
    userResponse.id = user.id;
    userResponse.name = user.name;
    userResponse.email = user.email;
    userResponse.phoneNumber = user.phoneNumber;
    userResponse.gender = user.gender;
    userResponse.enabled = user.enabled;
    userResponse.profileImage = user.profileImage;
    userResponse.address = user.address;
    userResponse.role = user.role;
    userResponse.createdBy = user.createdBy;
    userResponse.updatedBy = user.updatedBy;
    userResponse.deletedBy = user.deletedBy;
    userResponse.createdAt = user.createdAt;
    userResponse.updatedAt = user.updatedAt;
    userResponse.deletedAt = user.deletedAt;
    return userResponse;
  }
}
