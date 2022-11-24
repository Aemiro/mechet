import { Review } from '@interaction/domains/reviews/review';
import { ReviewEntity } from '@interaction/persistence/reviews/review.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  score: number;
  @ApiProperty()
  partnerId: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdBy?: string;
  @ApiProperty()
  updatedBy?: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt?: Date;
  @ApiProperty()
  deletedBy?: string;
  @ApiProperty()
  static fromEntity(reviewEntity: ReviewEntity): ReviewResponse {
    const reviewResponse = new ReviewResponse();
    reviewResponse.id = reviewEntity.id;
    reviewResponse.score = reviewEntity.score;
    reviewResponse.partnerId = reviewEntity.partnerId;
    reviewResponse.description = reviewEntity.description;
    reviewResponse.createdBy = reviewEntity.createdBy;
    reviewResponse.updatedBy = reviewEntity.updatedBy;
    reviewResponse.deletedBy = reviewEntity.deletedBy;
    reviewResponse.createdAt = reviewEntity.createdAt;
    reviewResponse.updatedAt = reviewEntity.updatedAt;
    reviewResponse.deletedAt = reviewEntity.deletedAt;
    return reviewResponse;
  }
  static fromDomain(review: Review): ReviewResponse {
    const reviewResponse = new ReviewResponse();
    reviewResponse.id = review.id;
    reviewResponse.score = review.score;
    reviewResponse.partnerId = review.partnerId;
    reviewResponse.description = review.description;
    reviewResponse.createdBy = review.createdBy;
    reviewResponse.updatedBy = review.updatedBy;
    reviewResponse.deletedBy = review.deletedBy;
    reviewResponse.createdAt = review.createdAt;
    reviewResponse.updatedAt = review.updatedAt;
    reviewResponse.deletedAt = review.deletedAt;
    return reviewResponse;
  }
}
