import { BranchReview } from '@interaction/domains/user-interaction/branch-reviews/branch-review';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchReviewCommand {
  @ApiProperty()
  userId: string;
  //@ApiProperty()
  branchId: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  rate: number;

  static fromCommands(command: CreateBranchReviewCommand): BranchReview {
    const branchReview = new BranchReview();
    branchReview.userId = command.userId;
    branchReview.branchId = command.branchId;
    branchReview.description = command.description;
    branchReview.rate = command.rate;
    return branchReview;
  }
}

export class UpdateBranchReviewCommand {
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

  static fromCommands(command: UpdateBranchReviewCommand): BranchReview {
    const branchReview = new BranchReview();
    branchReview.id = command.id;
    branchReview.userId = command.userId;
    branchReview.branchId = command.branchId;
    branchReview.description = command.description;
    branchReview.rate = command.rate;
    return branchReview;
  }
}
