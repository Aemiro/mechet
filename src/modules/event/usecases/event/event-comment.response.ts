import { EventComment } from '@event/domains/event/event-comment';
import { ApiProperty } from '@nestjs/swagger';
import { EventCommentEntity } from '@event/persistence/event/event-comment.entity';
export class EventCommentResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  eventId: string;
  @ApiProperty()
  description: string;

  static fromEntity(
    eventCommentEntity: EventCommentEntity,
  ): EventCommentResponse {
    const eventCommentResponse = new EventCommentResponse();
    eventCommentResponse.id = eventCommentEntity.id;
    eventCommentResponse.userId = eventCommentEntity.userId;
    eventCommentResponse.eventId = eventCommentEntity.eventId;
    eventCommentResponse.description = eventCommentEntity.description;
    return eventCommentResponse;
  }

  static fromDomain(eventComment: EventComment): EventCommentResponse {
    const eventCommentResponse = new EventCommentResponse();
    eventCommentResponse.id = eventComment.id;
    eventCommentResponse.userId = eventComment.userId;
    eventCommentResponse.eventId = eventComment.eventId;
    eventCommentResponse.description = eventComment.description;
    return eventCommentResponse;
  }
}
