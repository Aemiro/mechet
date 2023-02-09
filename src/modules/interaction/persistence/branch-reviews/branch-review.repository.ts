import { BranchReview } from '@interaction/domains/branch-reviews/branch-review';
import { IBranchReview } from '@interaction/domains/branch-reviews/branch-review.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchReviewEntity } from './branch-review.entity';

@Injectable()
export class BranchReviewRepository implements IBranchReview {
  constructor(
    @InjectRepository(BranchReviewEntity)
    private branchReviewRepository: Repository<BranchReviewEntity>,
  ) {}
  async insert(branchReview: BranchReview): Promise<BranchReview> {
    const branchReviewEntity = this.toBranchReviewEntity(branchReview);
    const result = await this.branchReviewRepository.save(branchReviewEntity);
    return result ? this.toBranchReview(result) : null;
  }
  async update(id: string, branchReview: BranchReview): Promise<BranchReview> {
    const branchReviewEntity = this.toBranchReviewEntity(branchReview);
    const result = await this.branchReviewRepository.save(branchReviewEntity);
    return result ? this.toBranchReview(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.branchReviewRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<BranchReview[]> {
    const branchReviews = await this.branchReviewRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!branchReviews.length) {
      return null;
    }
    return branchReviews.map((branchReview) =>
      this.toBranchReview(branchReview),
    );
  }
  async getById(id: string, withDeleted: boolean): Promise<BranchReview> {
    const branchReview = await this.branchReviewRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!branchReview[0]) {
      return null;
    }
    return this.toBranchReview(branchReview[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.branchReviewRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.branchReviewRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }

  toBranchReviewEntity(branchReview: BranchReview): BranchReviewEntity {
    const branchReviewEntity: BranchReviewEntity = new BranchReviewEntity();
    branchReviewEntity.id = branchReview.id;
    branchReviewEntity.userId = branchReview.userId;
    branchReviewEntity.branchId = branchReview.branchId;
    branchReviewEntity.description = branchReview.description;
    branchReviewEntity.rate = branchReview.rate;
    return branchReviewEntity;
  }

  toBranchReview(branchReviewEntity: BranchReviewEntity): BranchReview {
    const branchReview: BranchReview = new BranchReview();
    branchReview.id = branchReviewEntity.id;
    branchReview.userId = branchReviewEntity.userId;
    branchReview.branchId = branchReviewEntity.branchId;
    branchReview.description = branchReviewEntity.description;
    branchReview.rate = branchReviewEntity.rate;
    return branchReview;
  }
}
