import { EventReview } from '@interaction/domains/user-interaction/event-reviews/event-review';
import { EventReviewRepository } from '@interaction/persistence/user-interaction/event-reviews/event-review.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@user/domains/user/user';
import { UserRepository } from '@user/persistence/users/user.repository';
import { CreateEventReviewCommand } from './event-review.commands';
import { EventReviewResponse } from './event-review.response';

@Injectable()
export class EventReviewCommands {
  //private userDomain = new User();
  private eventReviewDomain = new EventReview();
  constructor(
    //private userRepository: UserRepository,
    private eventReviewRepository: EventReviewRepository,
  ) {}
  // async addEventReview(
  //   userId: string,
  //   createEventReviewCommand: CreateEventReviewCommand,
  // ): Promise<EventReviewResponse> {
  //   try {
  //     let eventReviewDomain = new EventReview();
  //     this.userDomain = await this.eventReviewRepository.getById(userId);
  //     if (this.userDomain) {
  //       eventReviewDomain = CreateEventReviewCommand.fromCommands(
  //         createEventReviewCommand,
  //       );
  //       if (!this.userDomain.eventReviews) {
  //         this.userDomain.eventReviews = [];
  //       }
  //       this.userDomain.addEventReview(eventReviewDomain);
  //       const result = await this.userRepository.update(
  //         userId,
  //         this.userDomain,
  //       );

  //       if (result) {
  //         return EventReviewResponse.fromDomain(
  //           result.eventReviews[result.eventReviews.length - 1],
  //         );
  //       }
  //     }
  //     return null;
  //   } catch (error) {
  //     throw new BadRequestException(error.code, error.message);
  //   }
  // }
  async createEventReview(
    command: CreateEventReviewCommand,
  ): Promise<EventReviewResponse> {
    this.eventReviewDomain = CreateEventReviewCommand.fromCommands(command);
    const result = await this.eventReviewRepository.insert(
      this.eventReviewDomain,
    );
    return EventReviewResponse.fromDomain(result);
  }

  // async removeEventReview(userId: string, id: string): Promise<boolean> {
  //   const eventReview = await this.userRepository.getById(userId);
  //   if (eventReview) {
  //     await eventReview.removeEventReview(id);
  //     const result = this.userRepository.update(userId, eventReview);
  //     if (result) return true;
  //   }
  //   return false;
  // }
  async removeEventReview(id: string): Promise<boolean> {
    const result = await this.eventReviewRepository.getById(id, false);
    if (result) return true;

    return false;
  }
}
