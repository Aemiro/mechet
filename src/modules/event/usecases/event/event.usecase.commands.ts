import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '@event/domains/event/event';
import { EventRepository } from '@event/persistence/event/event.repository';
import { FileManagerService } from '@libs/common/file-manager';
import { CreateEventCommand, UpdateEventCommand } from './event.commands';
import { EventResponse } from './event.response';

@Injectable()
export class EventCommands {
  private eventDomain = new Event();
  constructor(
    private eventRepository: EventRepository,
    private readonly fileManagerService: FileManagerService,
  ) {}

  async createEvent(command: CreateEventCommand): Promise<EventResponse> {
    const event = CreateEventCommand.fromCommands(command);
    const result = await this.eventRepository.insert(event);
    return EventResponse.fromDomain(result);
  }

  async UpdateEvent(
    id: string,
    command: UpdateEventCommand,
  ): Promise<EventResponse> {
    let event = await this.eventRepository.getById(command.id, true);
    if (event != null) {
      event = UpdateEventCommand.fromCommands(command);
      const result = await this.eventRepository.update(id, event);
      return EventResponse.fromDomain(result);
    }
  }

  async DeleteEvent(id: string): Promise<boolean> {
    const event = await this.eventRepository.getById(id, true);
    if (!event) {
      throw new NotFoundException(`Event not found with id ${id}`);
    }
    const result = await this.eventRepository.delete(id);

    return result;
  }

  async ArchiveEvent(id: string): Promise<boolean> {
    const event = await this.eventRepository.getById(id, true);
    if (!event) {
      throw new NotFoundException(`Event not found with id ${id}`);
    }
    return await this.eventRepository.archive(id);
  }

  async RestoreEvent(id: string): Promise<EventResponse> {
    const event = await this.eventRepository.getById(id, true);
    if (!event) {
      throw new NotFoundException(`Event not found with id ${id}`);
    }
    const result = await this.eventRepository.restore(id);
    if (result) {
      event.deletedAt = null;
    }
    return EventResponse.fromDomain(event);
  }

  // async createEventComment(
  //   eventId: string,
  //   command: CreateEventCommentCommand,
  // ): Promise<EventCommentResponse> {
  //   let eventCommentDomain = new EventComment();
  //   this.eventDomain = await this.eventRepository.getById(eventId);
  //   if (!this.eventDomain) {
  //     eventCommentDomain = CreateEventCommentCommand.fromCommands(command);
  //     this.eventDomain.addEventComment(eventCommentDomain);
  //     const result = await this.eventRepository.update(id,this.eventDomain);
  //     if (result) {
  //       return EventCommentResponse.fromDomain(
  //         result.eventComments[result.eventComments.length - 1],
  //       );
  //     }
  //   }
  // }
}
