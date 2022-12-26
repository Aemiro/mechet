import { BranchReview } from '@interaction/domains/user-interaction/branch-reviews/branch-review';
import { BranchReviewRepository } from '@interaction/persistence/user-interaction/branch-reviews/branch-review.repository';
import { Injectable } from '@nestjs/common';
import { CreateBranchReviewCommand } from './branch-review.commands';
import { BranchReviewResponse } from './branch-review.response';

@Injectable()
export class BranchReviewCommands {
  private branchReviewDomain = new BranchReview();
  constructor(private branchReviewRepository: BranchReviewRepository) {}
  async createBranchReview(
    command: CreateBranchReviewCommand,
  ): Promise<BranchReviewResponse> {
    this.branchReviewDomain = CreateBranchReviewCommand.fromCommands(command);
    const result = await this.branchReviewRepository.insert(
      this.branchReviewDomain,
    );
    return BranchReviewResponse.fromDomain(result);
  }
  async removeBranchReview(id: string): Promise<boolean> {
    const result = await this.branchReviewRepository.getById(id, false);
    if (result) return true;

    return false;
  }
}
