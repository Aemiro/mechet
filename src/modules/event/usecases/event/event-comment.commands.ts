import { EventComment } from '@event/domains/event/event-comment';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventCommentCommand {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  eventId: string;
  @ApiProperty()
  description: string;

  static fromCommands(command: CreateEventCommentCommand): EventComment {
    const eventComment = new EventComment();
    eventComment.userId = command.userId;
    eventComment.eventId = command.eventId;
    eventComment.description = command.description;
    return eventComment;
  }
}

export class UpdateEventCommentCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  eventId: string;
  @ApiProperty()
  description: string;

  static fromCommands(command: UpdateEventCommentCommand): EventComment {
    const eventComment = new EventComment();
    eventComment.id = command.id;
    eventComment.userId = command.userId;
    eventComment.eventId = command.eventId;
    eventComment.description = command.description;
    return eventComment;
  }
}
