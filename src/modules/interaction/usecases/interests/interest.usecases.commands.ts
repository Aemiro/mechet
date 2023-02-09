import { Interest } from '@interaction/domains/interests/interest';
import { InterestRepository } from '@interaction/persistence/interests/interest.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const interest = await this.interestRepository.getById(id);
    if (!interest) {
      throw new NotFoundException(`interest not found with id ${id}`);
    }
    const result = await this.interestRepository.delete(id);

    return result;
  }
}
