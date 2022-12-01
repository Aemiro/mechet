import { CreateReviewCommand } from './review.commands';
import { ReviewRepository } from '@interaction/persistence/reviews/review.repository';
import { ReviewResponse } from './review.response';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class ReviewCommands {
  constructor(
    private reviewRepository: ReviewRepository,
    private eventEmitter: EventEmitter2,
  ) {}
  async createReview(command: CreateReviewCommand): Promise<ReviewResponse> {
    const reviewDomain = CreateReviewCommand.fromCommand(command);
    console.log(reviewDomain);
    const review = await this.reviewRepository.insert(reviewDomain);
    this.eventEmitter.emit('update.partner.rate', {
      driverId: command.partnerId,
      score: command.score,
    });
    return ReviewResponse.fromDomain(review);
  }

  async archiveReview(id: string): Promise<boolean> {
    const reviewDomain = await this.reviewRepository.getById(id);
    if (!reviewDomain) {
      throw new NotFoundException(`Review not found with id ${id}`);
    }
    return await this.reviewRepository.archive(id);
  }
  async restoreReview(id: string): Promise<ReviewResponse> {
    const reviewDomain = await this.reviewRepository.getById(id, true);
    if (!reviewDomain) {
      throw new NotFoundException(`Review not found with id ${id}`);
    }
    const r = await this.reviewRepository.restore(id);
    if (r) {
      reviewDomain.deletedAt = null;
    }
    return ReviewResponse.fromDomain(reviewDomain);
  }
  async deleteReview(id: string): Promise<boolean> {
    const reviewDomain = await this.reviewRepository.getById(id, true);
    if (!reviewDomain) {
      throw new NotFoundException(`Review not found with id ${id}`);
    }
    return await this.reviewRepository.delete(id);
  }
}
