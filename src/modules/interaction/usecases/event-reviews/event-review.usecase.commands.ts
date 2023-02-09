import { UpdateEventRate } from '@event/usecases/event/event.commands';
import { EventReview } from '@interaction/domains/event-reviews/event-review';
import { EventReviewRepository } from '@interaction/persistence/event-reviews/event-review.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateEventReviewCommand } from './event-review.commands';
import { EventReviewResponse } from './event-review.response';

@Injectable()
export class EventReviewCommands {
  private eventReviewDomain = new EventReview();
  constructor(
    private eventReviewRepository: EventReviewRepository,
    private eventEmitter: EventEmitter2,
  ) {}
  async createEventReview(
    command: CreateEventReviewCommand,
  ): Promise<EventReviewResponse> {
    this.eventReviewDomain = CreateEventReviewCommand.fromCommands(command);
    const result = await this.eventReviewRepository.insert(
      this.eventReviewDomain,
    );
    if (result) {
      const rate = new UpdateEventRate();
      rate.eventId = command.eventId;
      rate.rate = command.rate;
      this.eventEmitter.emit('update.event.rate', rate);
    }
    return EventReviewResponse.fromDomain(result);
  }
  async removeEventReview(id: string): Promise<boolean> {
    const eventReview = await this.eventReviewRepository.getById(id);
    if (!eventReview) {
      throw new NotFoundException(`event review not found with id ${id}`);
    }
    const result = await this.eventReviewRepository.delete(id);

    return result;
  }
}
