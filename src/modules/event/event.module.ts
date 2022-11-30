import { FileManagerService } from '@libs/common/file-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './controllers/event.controller';
import { EventEntity } from './persistence/event/event.entity';
import { EventRepository } from './persistence/event/event.repository';
import { EventCommands } from './usecases/event/event.usecase.commands';
import { EventQueries } from './usecases/event/event.usecases.queries';
@Module({
  controllers: [EventController],
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [EventRepository, EventCommands, EventQueries, FileManagerService],
})
export class EventModule {}
