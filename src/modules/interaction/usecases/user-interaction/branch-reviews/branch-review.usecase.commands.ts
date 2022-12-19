import { BranchReview } from '@interaction/domains/user-interaction/branch-reviews/branch-review';
import { BranchReviewRepository } from '@interaction/persistence/user-interaction/branch-reviews/branch-review.repository';
import { Injectable } from '@nestjs/common';
import { User } from '@user/domains/user/user';
import { UserRepository } from '@user/persistence/users/user.repository';
import { EventReviewResponse } from '../event-reviews/event-review.response';
import { CreateBranchReviewCommand } from './branch-review.commands';
import { BranchReviewResponse } from './branch-review.response';

@Injectable()
export class BranchReviewCommands {
  // private userDomain = new User();
  private branchReviewDomain = new BranchReview();
  constructor(
    //private userRepository: UserRepository,
    private branchReviewRepository: BranchReviewRepository,
  ) {}
  // async addBranchReview(
  //   userId: string,
  //   createBranchReviewCommand: CreateBranchReviewCommand,
  // ): Promise<BranchReviewResponse> {
  //   const branchReview = CreateBranchReviewCommand.fromCommands(
  //     createBranchReviewCommand,
  //   );
  //   this.userDomain = await this.userRepository.getById(
  //     createBranchReviewCommand.userId,
  //   );
  //   this.userDomain.addBranchReview(branchReview);
  //   const result = await this.userRepository.update(userId, this.userDomain);
  //   if (result) {
  //     if (result.branchReviews.length != 0) {
  //       const w = result.branchReviews.filter(
  //         (row) => row.userId == createBranchReviewCommand.userId,
  //       );
  //       return BranchReviewResponse.fromDomain(w[0]);
  //     }
  //   }
  // }
  async createBranchReview(
    command: CreateBranchReviewCommand,
  ): Promise<BranchReviewResponse> {
    this.branchReviewDomain = CreateBranchReviewCommand.fromCommands(command);
    const result = await this.branchReviewRepository.insert(
      this.branchReviewDomain,
    );
    return BranchReviewResponse.fromDomain(result);
  }

  // async removeBranchReview(userId: string, id: string): Promise<boolean> {
  //   const branchReview = await this.userRepository.getById(userId);
  //   if (branchReview) {
  //     await branchReview.removeBranchReview(id);
  //     const result = this.userRepository.update(userId, branchReview);
  //     if (result) return true;
  //   }
  //   return false;
  // }
  async removeBranchReview(id: string): Promise<boolean> {
    const result = await this.branchReviewRepository.getById(id, false);
    if (result) return true;

    return false;
  }
}
