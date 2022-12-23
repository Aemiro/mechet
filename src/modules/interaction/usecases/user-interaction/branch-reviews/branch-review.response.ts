import { BranchReview } from '@interaction/domains/user-interaction/branch-reviews/branch-review';
import { BranchReviewEntity } from '@interaction/persistence/user-interaction/branch-reviews/branch-review.entity';
import { ApiProperty } from '@nestjs/swagger';

export class BranchReviewResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  branchId: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  rate: number;

  static fromEntity(
    branchReviewEntity: BranchReviewEntity,
  ): BranchReviewResponse {
    const branchReviewResponse = new BranchReviewResponse();
    branchReviewResponse.id = branchReviewEntity.id;
    branchReviewResponse.userId = branchReviewEntity.userId;
    branchReviewResponse.branchId = branchReviewEntity.branchId;
    branchReviewResponse.description = branchReviewEntity.description;
    branchReviewResponse.rate = branchReviewEntity.rate;
    return branchReviewResponse;
  }

  static fromDomain(branchReview: BranchReview): BranchReviewResponse {
    const branchReviewResponse = new BranchReviewResponse();
    branchReviewResponse.id = branchReview.id;
    branchReviewResponse.userId = branchReview.userId;
    branchReviewResponse.branchId = branchReview.branchId;
    branchReviewResponse.description = branchReview.description;
    branchReviewResponse.rate = branchReview.rate;
    return branchReviewResponse;
  }
}
