import { EventReviewEntity } from '@interaction/persistence/user-interaction/event-reviews/event-review.entity';
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
import { EventReviewResponse } from './event-review.response';

@Injectable()
export class EventReviewQueries {
  constructor(
    @InjectRepository(EventReviewEntity)
    private eventReviewRepository: Repository<EventReviewEntity>,
  ) {}

  async getEventReview(
    id: string,
    withDeleted = false,
  ): Promise<EventReviewResponse> {
    const follow = await this.eventReviewRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!follow[0]) {
      throw new NotFoundException(`event review not found with id ${id}`);
    }
    return EventReviewResponse.fromEntity(follow[0]);
  }

  async getEventReviews(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<EventReviewResponse>> {
    const dataQuery = QueryConstructor.constructQuery<EventReviewEntity>(
      this.eventReviewRepository,
      query,
    );
    const d = new DataResponseFormat<EventReviewResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => EventReviewResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }

  async getEventReviewsByUser(
    userId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<EventReviewResponse>> {
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
      const dataQuery = QueryConstructor.constructQuery<EventReviewEntity>(
        this.eventReviewRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<EventReviewResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => EventReviewResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }
  async getEventReviewsByEvent(
    eventId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<EventReviewResponse>> {
    try {
      if (!query.filter) {
        query.filter = [];
      }
      query.filter.push([
        {
          field: 'event_id',
          operator: FilterOperators.EqualTo,
          value: eventId,
        },
      ]);
      const dataQuery = QueryConstructor.constructQuery<EventReviewEntity>(
        this.eventReviewRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<EventReviewResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => EventReviewResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }
}
