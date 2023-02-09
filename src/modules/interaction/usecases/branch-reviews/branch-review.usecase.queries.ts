import { BranchReviewEntity } from '@interaction/persistence/branch-reviews/branch-review.entity';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { FilterOperators } from '@libs/collection-query/filter_operators';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchReviewResponse } from './branch-review.response';

@Injectable()
export class BranchReviewQueries {
  constructor(
    @InjectRepository(BranchReviewEntity)
    private branchReviewRepository: Repository<BranchReviewEntity>,
  ) {}

  async getBranchReview(
    id: string,
    withDeleted = false,
  ): Promise<BranchReviewResponse> {
    const follow = await this.branchReviewRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!follow[0]) {
      throw new NotFoundException(`branch review not found with id ${id}`);
    }
    return BranchReviewResponse.fromEntity(follow[0]);
  }

  async getBranchReviews(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<BranchReviewResponse>> {
    const dataQuery = QueryConstructor.constructQuery<BranchReviewEntity>(
      this.branchReviewRepository,
      query,
    );
    const d = new DataResponseFormat<BranchReviewResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => BranchReviewResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }

  async getBranchReviewsByUser(
    userId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<BranchReviewResponse>> {
    try {
      if (!query.filter) {
        query.filter = [];
      }
      query.filter.push([
        {
          field: 'user_id',
          operator: FilterOperators.EqualTo,
          value: userId,
        },
      ]);
      const dataQuery = QueryConstructor.constructQuery<BranchReviewEntity>(
        this.branchReviewRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<BranchReviewResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) =>
          BranchReviewResponse.fromEntity(entity),
        );
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }
  async getBranchReviewsByBranch(
    branchId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<BranchReviewResponse>> {
    try {
      if (!query.filter) {
        query.filter = [];
      }
      query.filter.push([
        {
          field: 'branch_id',
          operator: FilterOperators.EqualTo,
          value: branchId,
        },
      ]);
      const dataQuery = QueryConstructor.constructQuery<BranchReviewEntity>(
        this.branchReviewRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<BranchReviewResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) =>
          BranchReviewResponse.fromEntity(entity),
        );
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }
}
