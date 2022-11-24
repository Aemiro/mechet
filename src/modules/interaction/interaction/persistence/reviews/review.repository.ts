import { ReviewEntity } from '@interaction/persistence/reviews/review.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IReviewRepository } from '@interaction/domains/reviews/review.repository.interface';
import { Review } from '@interaction/domains/reviews/review';
@Injectable()
export class ReviewRepository implements IReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}
  async insert(review: Review): Promise<Review> {
    const reviewEntity = this.toReviewEntity(review);
    console.log(reviewEntity);
    const result = await this.reviewRepository.save(reviewEntity);
    return result ? this.toReview(result) : null;
  }
  async update(review: Review): Promise<Review> {
    const reviewEntity = this.toReviewEntity(review);
    const result = await this.reviewRepository.save(reviewEntity);
    return result ? this.toReview(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.reviewRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<Review[]> {
    const reviews = await this.reviewRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!reviews.length) {
      return null;
    }
    return reviews.map((user) => this.toReview(user));
  }
  async getById(id: string, withDeleted = false): Promise<Review> {
    const review = await this.reviewRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!review[0]) {
      return null;
    }
    return this.toReview(review[0]);
  }

  async archive(id: string): Promise<boolean> {
    const result = await this.reviewRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.reviewRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }
  toReview(reviewEntity: ReviewEntity): Review {
    const review = new Review();
    review.id = reviewEntity.id;
    review.score = reviewEntity.score;
    review.partnerId = reviewEntity.partnerId;
    review.description = reviewEntity.description;
    review.createdBy = reviewEntity.createdBy;
    review.updatedBy = reviewEntity.updatedBy;
    review.deletedBy = reviewEntity.deletedBy;
    review.createdAt = reviewEntity.createdAt;
    review.updatedAt = reviewEntity.updatedAt;
    review.deletedAt = reviewEntity.deletedAt;
    return review;
  }
  toReviewEntity(review: Review): ReviewEntity {
    const reviewEntity = new ReviewEntity();
    reviewEntity.id = review.id;
    reviewEntity.score = review.score;
    reviewEntity.partnerId = review.partnerId;
    reviewEntity.description = review.description;
    reviewEntity.createdBy = review.createdBy;
    reviewEntity.updatedBy = review.updatedBy;
    reviewEntity.deletedBy = review.deletedBy;
    reviewEntity.createdAt = review.createdAt;
    reviewEntity.updatedAt = review.updatedAt;
    reviewEntity.deletedAt = review.deletedAt;
    return reviewEntity;
  }
}
