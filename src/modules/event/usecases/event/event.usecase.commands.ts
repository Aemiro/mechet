import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '@event/domains/event/event';
import { EventRepository } from '@event/persistence/event/event.repository';
import { FileManagerService } from '@libs/common/file-manager';
import {
  CreateEventCommand,
  UpdateEventCommand,
  UpdateEventRate,
} from './event.commands';
import { EventResponse } from './event.response';
import {
  CreateEventCommentCommand,
  UpdateEventCommentCommand,
} from './event-comment.commands';
import { EventCommentRepository } from '@event/persistence/event/event-comment.repository';
import { EventCommentResponse } from './event-comment.response';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EventCommands {
  private eventDomain = new Event();
  constructor(
    private eventRepository: EventRepository,
    private eventCommentRepository: EventCommentRepository,
    private readonly fileManagerService: FileManagerService,
  ) {}

  async createEvent(command: CreateEventCommand): Promise<EventResponse> {
    const event = CreateEventCommand.fromCommands(command);
    const result = await this.eventRepository.insert(event);
    return EventResponse.fromDomain(result);
  }
  @OnEvent('update.event.rate')
  async updateEventRate(rateCommand: UpdateEventRate) {
    console.log('event emitted');
    const event = await this.eventRepository.getById(rateCommand.eventId, true);
    if (event.averageRate == null) {
      event.averageRate.rate = 0;
      event.averageRate.totalReviews = 0;
    }
    const currentRate = event.averageRate.rate;
    const currentTotatalReview = event.averageRate.totalReviews;
    event.averageRate.totalReviews += 1;
    event.averageRate.rate =
      (currentRate * currentTotatalReview + rateCommand.rate) /
      event.averageRate.totalReviews;
    const result = await this.eventRepository.update(
      rateCommand.eventId,
      event,
    );
    return EventResponse.fromDomain(result);
  }

  async addEventView(
    id: string,
    createEventCommand: CreateEventCommand,
  ): Promise<EventResponse> {
    const eventView = CreateEventCommand.fromCommands(createEventCommand);
    this.eventDomain = await this.eventRepository.getById(id);
    this.eventDomain.views++;

    const result = await this.eventRepository.update(id, this.eventDomain);
    if (result) {
      return EventResponse.fromDomain(result);
    }
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
  ): Promise<EventCommentResponse> {
    const eventDomain = await this.eventRepository.getById(command.eventId);
    if (!eventDomain) {
      throw new NotFoundException(
        `event comment not found with id ${command.eventId}`,
      );
    }
    const eventComment = CreateEventCommentCommand.fromCommands(command);
    const result = await this.eventCommentRepository.insert(eventComment);
    if (result) {
      return EventCommentResponse.fromDomain(result);
    }
    return null;
  }

  async updateEventComment(
    command: UpdateEventCommentCommand,
  ): Promise<EventCommentResponse> {
    const eventDomain = await this.eventRepository.getById(command.eventId);
    if (!eventDomain) {
      throw new NotFoundException(
        `event comment not found with id ${command.eventId}`,
      );
    }

    const eventComment = UpdateEventCommentCommand.fromCommands(command);
    const result = await this.eventCommentRepository.update(
      command.eventId,
      eventComment,
    );
    if (result) {
      return EventCommentResponse.fromDomain(result);
    }

    return null;
  }
  async removeEventComment(id: string): Promise<boolean> {
    const eventComment = await this.eventCommentRepository.getById(id, true);
    if (!eventComment) {
      throw new NotFoundException(`Event comment not found with id ${id}`);
    }
    const result = await this.eventCommentRepository.delete(id);

    return result;
  }
  // async addEventView(
  //   id: string,
  //   createEventCommand: CreateEventCommand,
  // ): Promise<EventResponse> {
  //   const eventView = CreateEventCommand.fromCommands(createEventCommand);
  //   const views = await this.eventRepository.getById(id);

  //   if (views.length === 0) {
  //     this.eventDomain.viewCount++;
  //   }
  //   const result = await this.eventRepository.update(id, this.eventDomain);
  //   if (result) {
  //       return EventResponse.fromDomain(result);
  //     }
  //   }
}
