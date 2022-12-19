import { Follow } from '@interaction/domains/user-interaction/follows/follow';
import { FollowEntity } from '@interaction/persistence/user-interaction/follows/follow.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FollowResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  partnerId: string;

  static fromEntity(followEntity: FollowEntity): FollowResponse {
    const followResponse = new FollowResponse();
    followResponse.id = followEntity.id;
    followResponse.userId = followEntity.userId;
    followResponse.partnerId = followEntity.partnerId;
    return followResponse;
  }

  static fromDomain(follow: Follow): FollowResponse {
    const followResponse = new FollowResponse();
    followResponse.id = follow.id;
    followResponse.userId = follow.userId;
    followResponse.partnerId = follow.partnerId;
    return followResponse;
  }
}
