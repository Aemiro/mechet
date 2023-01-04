import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '@event/domains/event/event';
import { EventRepository } from '@event/persistence/event/event.repository';
import { FileManagerService } from '@libs/common/file-manager';
import { CreateEventCommand, UpdateEventCommand } from './event.commands';
import { EventResponse } from './event.response';
import {
  CreateEventCommentCommand,
  UpdateEventCommentCommand,
} from './event-comment.commands';

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

  async createEventComment(
    command: CreateEventCommentCommand,
  ): Promise<EventResponse> {
    const eventDomain = await this.eventRepository.getById(command.eventId);
    if (!eventDomain) {
      throw new NotFoundException(
        `event comment not found with id ${command.eventId}`,
      );
    }
    const commentDomain = CreateEventCommentCommand.fromCommands(command);
    eventDomain.addEventComment(commentDomain);
    const result = await this.eventRepository.update(
      command.eventId,
      eventDomain,
    );
    if (result) {
      return EventResponse.fromDomain(result);
    }
  }

  async updateEventComment(
    command: UpdateEventCommentCommand,
  ): Promise<EventResponse> {
    const eventDomain = await this.eventRepository.getById(command.eventId);
    if (!eventDomain) {
      throw new NotFoundException(
        `event comment not found with id ${command.eventId}`,
      );
    }

    const commentDomain = UpdateEventCommentCommand.fromCommands(command);
    eventDomain.updateEventComment(commentDomain);
    const result = await this.eventRepository.update(
      command.eventId,
      eventDomain,
    );
    if (result) {
      return EventResponse.fromDomain(result);
    }

    return null;
  }
  async removeEventComment(id: string): Promise<boolean> {
    const eventDomain = await this.eventRepository.getById(id);
    if (eventDomain) {
      await eventDomain.removeEventComment(id);
      const result = await this.eventRepository.update(id, eventDomain);
      if (result) return true;
    }
    return false;
  }
}
