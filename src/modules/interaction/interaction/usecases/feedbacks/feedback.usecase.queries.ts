import { CollectionQuery } from '@libs/collection-query/collection-query';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackEntity } from '@interaction/persistence/feedbacks/feedback.entity';
import { Repository } from 'typeorm';
import { FeedbackResponse } from './feedback.response';
import { FilterOperators } from '@libs/collection-query/filter_operators';
@Injectable()
export class FeedbackQuery {
  constructor(
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
  ) {}
  async getFeedback(id: string): Promise<FeedbackResponse> {
    const feedback = await this.feedbackRepository.find({
      where: { id: id },
      relations: [],
    });
    if (!feedback[0]) {
      throw new NotFoundException(`Feedback not found with id ${id}`);
    }
    return FeedbackResponse.fromEntity(feedback[0]);
  }
  async getFeedbacks(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<FeedbackResponse>> {
    const dataQuery = QueryConstructor.constructQuery<FeedbackEntity>(
      this.feedbackRepository,
      query,
    );
    const d = new DataResponseFormat<FeedbackResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => FeedbackResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getArchivedFeedbacks(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<FeedbackResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<FeedbackEntity>(
      this.feedbackRepository,
      query,
    );
    dataQuery.withDeleted();
    console.log(dataQuery.getSql(), dataQuery.getParameters());
    const d = new DataResponseFormat<FeedbackResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => FeedbackResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
}
