import { Interest } from '@interaction/domains/user-interaction/interests/interest';
import { InterestRepository } from '@interaction/persistence/user-interaction/interests/interest.repository';
import { Injectable } from '@nestjs/common';
import { CreateInterestCommand } from './interest.command';
import { InterestResponse } from './interest.response';

@Injectable()
export class InterestCommands {
  private interestDomain = new Interest();
  constructor(private interestRepository: InterestRepository) {}

  async createInterest(
    command: CreateInterestCommand,
  ): Promise<InterestResponse> {
    this.interestDomain = CreateInterestCommand.fromCommands(command);
    const result = await this.interestRepository.insert(this.interestDomain);
    return InterestResponse.fromDomain(result);
  }
  async removeInterest(id: string): Promise<boolean> {
    const result = await this.interestRepository.getById(id, false);
    if (result) return true;

    return false;
  }
}
