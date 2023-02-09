import { ApiProperty } from '@nestjs/swagger';
import { Interest } from '@interaction/domains/interests/interest';

export class CreateInterestCommand {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  eventId: string;

  static fromCommands(command: CreateInterestCommand): Interest {
    const interest = new Interest();
    interest.userId = command.userId;
    interest.eventId = command.eventId;
    return interest;
  }
}

export class UpdateInterestCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  eventId: string;

  static fromCommands(command: UpdateInterestCommand): Interest {
    const interest = new Interest();
    interest.id = command.id;
    interest.userId = command.userId;
    interest.eventId = command.eventId;
    return interest;
  }
}
