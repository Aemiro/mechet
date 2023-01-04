import { EventReview } from '@interaction/domains/user-interaction/event-reviews/event-review';
import { EventReviewRepository } from '@interaction/persistence/user-interaction/event-reviews/event-review.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventReviewCommand } from './event-review.commands';
import { EventReviewResponse } from './event-review.response';

@Injectable()
export class EventReviewCommands {
  private eventReviewDomain = new EventReview();
  constructor(private eventReviewRepository: EventReviewRepository) {}
  async createEventReview(
    command: CreateEventReviewCommand,
  ): Promise<EventReviewResponse> {
    this.eventReviewDomain = CreateEventReviewCommand.fromCommands(command);
    const result = await this.eventReviewRepository.insert(
      this.eventReviewDomain,
    );
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
