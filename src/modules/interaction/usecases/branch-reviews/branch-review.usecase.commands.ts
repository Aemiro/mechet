import { BranchReview } from '@interaction/domains/branch-reviews/branch-review';
import { BranchReviewRepository } from '@interaction/persistence/branch-reviews/branch-review.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateBranchRate } from '@partner/usecases/partner/branch.commands';
import { CreateBranchReviewCommand } from './branch-review.commands';
import { BranchReviewResponse } from './branch-review.response';

@Injectable()
export class BranchReviewCommands {
  private branchReviewDomain = new BranchReview();
  constructor(
    private branchReviewRepository: BranchReviewRepository,
    private eventEmitter: EventEmitter2,
  ) {}
  async createBranchReview(
    command: CreateBranchReviewCommand,
  ): Promise<BranchReviewResponse> {
    this.branchReviewDomain = CreateBranchReviewCommand.fromCommands(command);
    const result = await this.branchReviewRepository.insert(
      this.branchReviewDomain,
    );
    if (result) {
      const rate = new UpdateBranchRate();
      rate.branchId = command.branchId;
      rate.rate = command.rate;
      this.eventEmitter.emit('update.branch.rate', rate);
    }
    return BranchReviewResponse.fromDomain(result);
  }
  async removeBranchReview(id: string): Promise<boolean> {
    const branchReview = await this.branchReviewRepository.getById(id, false);
    if (!branchReview) {
      throw new NotFoundException(`branch review not found with id ${id}`);
    }
    const result = await this.branchReviewRepository.delete(id);
    return result;
  }
}
