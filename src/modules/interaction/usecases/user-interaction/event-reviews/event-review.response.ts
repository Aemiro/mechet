import { EventReview } from '@interaction/domains/user-interaction/event-reviews/event-review';
import { EventReviewEntity } from '@interaction/persistence/user-interaction/event-reviews/event-review.entity';
import { ApiProperty } from '@nestjs/swagger';

export class EventReviewResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  eventId: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  rate: number;

  static fromEntity(eventReviewEntity: EventReviewEntity): EventReviewResponse {
    const eventReviewResponse = new EventReviewResponse();
    eventReviewResponse.id = eventReviewEntity.id;
    eventReviewResponse.userId = eventReviewEntity.userId;
    eventReviewResponse.eventId = eventReviewEntity.eventId;
    eventReviewResponse.description = eventReviewEntity.description;
    eventReviewResponse.rate = eventReviewEntity.rate;
    return eventReviewResponse;
  }

  static fromDomain(eventReview: EventReview): EventReviewResponse {
    const eventReviewResponse = new EventReviewResponse();
    eventReviewResponse.id = eventReview.id;
    eventReviewResponse.userId = eventReview.userId;
    eventReviewResponse.eventId = eventReview.eventId;
    eventReviewResponse.description = eventReview.description;
    eventReviewResponse.rate = eventReview.rate;
    return eventReviewResponse;
  }
}
