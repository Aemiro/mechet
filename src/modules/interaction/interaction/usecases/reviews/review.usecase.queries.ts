import { CollectionQuery } from '@libs/collection-query/collection-query';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from '@interaction/persistence/reviews/review.entity';
import { Repository } from 'typeorm';
import { ReviewResponse } from './review.response';
import { FilterOperators } from '@libs/collection-query/filter_operators';
@Injectable()
export class ReviewQuery {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}
  async getReview(id: string): Promise<ReviewResponse> {
    const review = await this.reviewRepository.find({
      where: { id: id },
      relations: ['passenger', 'driver'],
    });
    if (!review[0]) {
      throw new NotFoundException(`Review not found with id ${id}`);
    }
    return ReviewResponse.fromEntity(review[0]);
  }
  async getReviews(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<ReviewResponse>> {
    const dataQuery = QueryConstructor.constructQuery<ReviewEntity>(
      this.reviewRepository,
      query,
    );
    const d = new DataResponseFormat<ReviewResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => ReviewResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getArchivedReviews(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<ReviewResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<ReviewEntity>(
      this.reviewRepository,
      query,
    );
    dataQuery.withDeleted();
    console.log(dataQuery.getSql(), dataQuery.getParameters());
    const d = new DataResponseFormat<ReviewResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => ReviewResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
}
