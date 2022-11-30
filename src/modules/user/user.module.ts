import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/user.controller';
import { Module } from '@nestjs/common';
import { FileManagerService } from '@libs/common/file-manager';
import { UserEntity } from './persistence/users/user.entity';
import { UserRepository } from './persistence/users/user.repository';
import { UserCommands } from './usecases/user/user.usecase.commands';
import { UserQueries } from './usecases/user/user.usecase.queries';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, UserCommands, UserQueries, FileManagerService],
})
export class UserModule {}
