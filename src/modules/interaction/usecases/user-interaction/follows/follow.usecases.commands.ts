import { Follow } from '@interaction/domains/user-interaction/follows/follow';
import { FollowRepository } from '@interaction/persistence/user-interaction/follows/follow.repository';
import { Injectable } from '@nestjs/common';
import { CreateFollowCommand } from './follow.commands';
import { FollowResponse } from './follow.response';

@Injectable()
export class FollowCommands {
  private followDomain = new Follow();
  constructor(private followRepository: FollowRepository) {}

  async createFollow(command: CreateFollowCommand): Promise<FollowResponse> {
    this.followDomain = CreateFollowCommand.fromCommands(command);
    const result = await this.followRepository.insert(this.followDomain);
    return FollowResponse.fromDomain(result);
  }
  async removeFollow(id: string): Promise<boolean> {
    const result = await this.followRepository.getById(id, false);
    if (result) return true;

    return false;
  }
}
