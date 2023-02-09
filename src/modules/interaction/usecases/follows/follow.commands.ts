import { ApiProperty } from '@nestjs/swagger';
import { Follow } from '@interaction/domains/follows/follow';

export class CreateFollowCommand {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  branchId: string;

  static fromCommands(command: CreateFollowCommand): Follow {
    const follow = new Follow();
    follow.userId = command.userId;
    follow.branchId = command.branchId;
    return follow;
  }
}

export class UpdateFollowCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  branchId: string;

  static fromCommands(command: UpdateFollowCommand): Follow {
    const follow = new Follow();
    follow.id = command.id;
    follow.userId = command.userId;
    follow.branchId = command.branchId;
    return follow;
  }
}
