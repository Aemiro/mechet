import { BranchReview } from '@interaction/domains/user-interaction/branch-reviews/branch-review';
import { BranchReviewRepository } from '@interaction/persistence/user-interaction/branch-reviews/branch-review.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const branchReview = await this.branchReviewRepository.getById(id, false);
    if (!branchReview) {
      throw new NotFoundException(`branch review not found with id ${id}`);
    }
    const result = await this.branchReviewRepository.delete(id);
    return result;
  }
}
