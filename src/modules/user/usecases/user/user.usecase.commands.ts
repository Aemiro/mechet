import {
  FileManagerService,
  FileManagerHelper,
} from '@libs/common/file-manager';
import { FileDto } from '@libs/common/file-dto';
import { FileResponseDto } from '@libs/common/file-manager/dtos/file-response.dto';
import { CreateUserCommand, UpdateUserCommand } from './user.commands';
import { UserResponse } from './user.response';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Utility } from '@libs/common/utility';
import { User } from '@user/domains/user/user';
import { UserRepository } from '@user/persistence/users/user.repository';
@Injectable()
export class UserCommands {
  private userDomain = new User();
  constructor(
    private userRepository: UserRepository,
    private readonly fileManagerService: FileManagerService,
  ) {}
  async createUser(command: CreateUserCommand): Promise<UserResponse> {
    if (await this.userRepository.getByPhoneNumber(command.phoneNumber, true)) {
      throw new BadRequestException(
        `User already exist with this phone number`,
      );
    }
    if (
      command.email &&
      (await this.userRepository.getByEmail(command.email, true))
    ) {
      throw new BadRequestException(
        `User already exist with this email Address`,
      );
    }
    this.userDomain = CreateUserCommand.fromCommands(command);

    console.log(this.userDomain);
    this.userDomain.password = Utility.hashPassword(command.password);
    const user = await this.userRepository.insert(this.userDomain);
    return UserResponse.fromDomain(user);
  }
  async updateUser(
    id: string,
    command: UpdateUserCommand,
  ): Promise<UserResponse> {
    const userDomain = await this.userRepository.getById(command.id);
    if (!userDomain) {
      throw new NotFoundException(`User not found with id ${command.id}`);
    }
    userDomain.email = command.email;
    userDomain.name = command.name;
    userDomain.address = command.address;
    userDomain.phoneNumber = command.phoneNumber;
    userDomain.gender = command.gender;
    userDomain.role = command.role;
    const user = await this.userRepository.update(id, userDomain);
    return UserResponse.fromDomain(user);
  }
  async archiveUser(id: string): Promise<boolean> {
    const userDomain = await this.userRepository.getById(id);
    if (!userDomain) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    return await this.userRepository.archive(id);
  }
  async restoreUser(id: string): Promise<UserResponse> {
    const userDomain = await this.userRepository.getById(id, true);
    if (!userDomain) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    const r = await this.userRepository.restore(id);
    if (r) {
      userDomain.deletedAt = null;
    }
    return UserResponse.fromDomain(userDomain);
  }
  async deleteUser(id: string): Promise<boolean> {
    const userDomain = await this.userRepository.getById(id, true);
    if (!userDomain) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    const result = await this.userRepository.delete(id);
    if (result) {
      if (userDomain.profileImage) {
        await this.fileManagerService.removeFile(
          userDomain.profileImage,
          FileManagerHelper.UPLOADED_FILES_DESTINATION,
        );
      }
    }
    return result;
  }
  async activateOrBlockUser(id: string): Promise<UserResponse> {
    const userDomain = await this.userRepository.getById(id);
    if (!userDomain) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    userDomain.enabled = !userDomain.enabled;
    const result = await this.userRepository.update(id, userDomain);
    return UserResponse.fromDomain(result);
  }
  async updateUserProfileImage(id: string, fileDto: FileResponseDto) {
    const userDomain = await this.userRepository.getById(id, true);
    if (!userDomain) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    if (userDomain.profileImage && fileDto) {
      await this.fileManagerService.removeFile(
        userDomain.profileImage,
        FileManagerHelper.UPLOADED_FILES_DESTINATION,
      );
    }
    userDomain.profileImage = fileDto as FileDto;
    const result = await this.userRepository.update(id, userDomain);
    return UserResponse.fromDomain(result);
  }
}
