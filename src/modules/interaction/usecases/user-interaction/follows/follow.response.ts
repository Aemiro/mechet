import { Follow } from '@interaction/domains/user-interaction/follows/follow';
import { FollowEntity } from '@interaction/persistence/user-interaction/follows/follow.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FollowResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  branchId: string;

  static fromEntity(followEntity: FollowEntity): FollowResponse {
    const followResponse = new FollowResponse();
    followResponse.id = followEntity.id;
    followResponse.userId = followEntity.userId;
    followResponse.branchId = followEntity.branchId;
    return followResponse;
  }

  static fromDomain(follow: Follow): FollowResponse {
    const followResponse = new FollowResponse();
    followResponse.id = follow.id;
    followResponse.userId = follow.userId;
    followResponse.branchId = follow.branchId;
    return followResponse;
  }
}
