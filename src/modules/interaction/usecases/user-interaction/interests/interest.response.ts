import { ApiProperty } from '@nestjs/swagger';
import { Interest } from '@interaction/domains/user-interaction/interests/interest';
import { InterestEntity } from '@interaction/persistence/user-interaction/interests/interest.entity';

export class InterestResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  eventId: string;

  static fromEntity(interestEntity: InterestEntity): InterestResponse {
    const interestResponse = new InterestResponse();
    interestResponse.id = interestEntity.id;
    interestResponse.userId = interestEntity.userId;
    interestResponse.eventId = interestEntity.eventId;
    return interestResponse;
  }

  static fromDomain(interest: Interest): InterestResponse {
    const interestResponse = new InterestResponse();
    interestResponse.id = interest.id;
    interestResponse.userId = interest.userId;
    interestResponse.eventId = interest.eventId;
    return interestResponse;
  }
}
