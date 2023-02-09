import { Follow } from '@interaction/domains/follows/follow';
import { FollowRepository } from '@interaction/persistence/follows/follow.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const follow = await this.followRepository.getById(id);
    if (!follow) {
      throw new NotFoundException(`follow not found with id ${id}`);
    }
    const result = await this.followRepository.delete(id);

    return result;
  }
}
