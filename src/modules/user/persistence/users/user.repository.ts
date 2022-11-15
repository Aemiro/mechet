import { UserEntity } from '@user/persistence/users/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/domains/users/user';
import { IUserRepository } from '@user/domains/users/user.repository.interface';
import { Repository } from 'typeorm';
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async insert(user: User): Promise<User> {
    const userEntity = this.toUserEntity(user);
    const result = await this.userRepository.save(userEntity);
    return result ? this.toUser(result) : null;
  }
  async update(user: User): Promise<User> {
    const userEntity = this.toUserEntity(user);
    const result = await this.userRepository.save(userEntity);
    return result ? this.toUser(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!users.length) {
      return null;
    }
    return users.map((user) => this.toUser(user));
  }
  async getById(id: string, withDeleted = false): Promise<User> {
    const user = await this.userRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!user[0]) {
      return null;
    }
    return this.toUser(user[0]);
  }
  async getByPhoneNumber(
    phoneNumber: string,
    withDeleted = false,
  ): Promise<User> {
    const user = await this.userRepository.find({
      where: { phoneNumber: phoneNumber },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!user[0]) {
      return null;
    }
    return this.toUser(user[0]);
  }
  async getByEmail(email: string, withDeleted = false): Promise<User> {
    const user = await this.userRepository.find({
      where: { email: email },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!user[0]) {
      return null;
    }
    return this.toUser(user[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.userRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.userRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }
  toUser(userEntity: UserEntity): User {
    const user = new User();
    user.id = userEntity.id;
    user.name = userEntity.name;
    user.email = userEntity.email;
    user.phoneNumber = userEntity.phoneNumber;
    user.gender = userEntity.gender;
    user.password = userEntity.password;
    user.enabled = userEntity.enabled;
    user.profileImage = userEntity.profileImage;
    user.address = userEntity.address;
    user.role = userEntity.role;
    user.createdBy = userEntity.createdBy;
    user.updatedBy = userEntity.updatedBy;
    user.deletedBy = userEntity.deletedBy;
    user.createdAt = userEntity.createdAt;
    user.updatedAt = userEntity.updatedAt;
    user.deletedAt = userEntity.deletedAt;
    return user;
  }
  toUserEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.phoneNumber = user.phoneNumber;
    userEntity.gender = user.gender;
    userEntity.enabled = user.enabled;
    userEntity.profileImage = user.profileImage;
    userEntity.address = user.address;
    userEntity.password = user.password;
    userEntity.role = user.role;
    userEntity.createdBy = user.createdBy;
    userEntity.updatedBy = user.updatedBy;
    userEntity.deletedBy = user.deletedBy;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    userEntity.deletedAt = user.deletedAt;
    return userEntity;
  }
}
