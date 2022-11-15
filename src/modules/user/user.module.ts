import { UserEntity } from '@user/persistence/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCommands } from './usecases/users/user.usecase.commands';
import { UserRepository } from './persistence/users/user.repository';
import { UsersController } from './controllers/user.controller';
import { Module } from '@nestjs/common';
import { UserQueries } from './usecases/users/user.usecase.queries';
import { FileManagerService } from '@libs/common/file-manager';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, UserCommands, UserQueries, FileManagerService],
})
export class UserModule {}
