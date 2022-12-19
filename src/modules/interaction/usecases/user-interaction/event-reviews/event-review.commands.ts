import { EventReview } from '@interaction/domains/user-interaction/event-reviews/event-review';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventReviewCommand {
  @ApiProperty()
  userId: string;
  //@ApiProperty()
  eventId: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  rate: number;

  static fromCommands(command: CreateEventReviewCommand): EventReview {
    const eventReview = new EventReview();
    eventReview.userId = command.userId;
    eventReview.eventId = command.eventId;
    eventReview.description = command.description;
    eventReview.rate = command.rate;
    return eventReview;
  }
}

export class UpdateEventReviewCommand {
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

  static fromCommands(command: UpdateEventReviewCommand): EventReview {
    const eventReview = new EventReview();
    eventReview.id = command.id;
    eventReview.userId = command.userId;
    eventReview.eventId = command.eventId;
    eventReview.description = command.description;
    eventReview.rate = command.rate;
    return eventReview;
  }
}
