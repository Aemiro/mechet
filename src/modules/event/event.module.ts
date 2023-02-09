import { FileManagerService } from '@libs/common/file-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ECategoryController } from './controllers/e-category.controller';
import { EventController } from './controllers/event.controller';
import { ECategoryEntity } from './persistence/e-category/e-category.entity';
import { ECategoryRepository } from './persistence/e-category/e-category.repository';
import { EventCommentEntity } from './persistence/event/event-comment.entity';
import { EventCommentRepository } from './persistence/event/event-comment.repository';
import { EventEntity } from './persistence/event/event.entity';
import { EventRepository } from './persistence/event/event.repository';
import { ECategoryCommands } from './usecases/e-category/e-category.usecases.commands';
import { ECategoryQueries } from './usecases/e-category/e-category.usecases.queries';
import { EventCommands } from './usecases/event/event.usecase.commands';
import { EventQueries } from './usecases/event/event.usecases.queries';
@Module({
  controllers: [EventController, ECategoryController],
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      ECategoryEntity,
      EventCommentEntity,
    ]),
  ],
  providers: [
    EventRepository,
    EventCommands,
    EventQueries,
    EventCommentRepository,
    FileManagerService,
    ECategoryRepository,
    ECategoryCommands,
    ECategoryQueries,
  ],
})
export class EventModule {}
