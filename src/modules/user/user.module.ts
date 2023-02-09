import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/user.controller';
import { Module } from '@nestjs/common';
import { FileManagerService } from '@libs/common/file-manager';
import { UserEntity } from './persistence/users/user.entity';
import { UserRepository } from './persistence/users/user.repository';
import { UserCommands } from './usecases/user/user.usecase.commands';
import { UserQueries } from './usecases/user/user.usecase.queries';
import { EventCommentEntity } from '@event/persistence/event/event-comment.entity';
import { EventCommentRepository } from '@event/persistence/event/event-comment.repository';
import { BlogCommentEntity } from '@blog/persistence/blog/blog-comment.entity';
import { BlogCommentRepository } from '@blog/persistence/blog/blog-comment.repository';

@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      EventCommentEntity,
      BlogCommentEntity,
    ]),
  ],
  providers: [
    UserRepository,
    UserCommands,
    UserQueries,
    FileManagerService,
    EventCommentRepository,
    BlogCommentRepository,
  ],
})
export class UserModule {}
