import { InterestEntity } from '@interaction/persistence/user-interaction/interests/interest.entity';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { FilterOperators } from '@libs/collection-query/filter_operators';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterestResponse } from './interest.response';

@Injectable()
export class InterestQueries {
  constructor(
    @InjectRepository(InterestEntity)
    private interestRepository: Repository<InterestEntity>,
  ) {}

  async getInterest(
    id: string,
    withDeleted = false,
  ): Promise<InterestResponse> {
    const interest = await this.interestRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!interest[0]) {
      throw new NotFoundException(`interest not found with id ${id}`);
    }
    return InterestResponse.fromEntity(interest[0]);
  }

  async getInterests(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<InterestResponse>> {
    const dataQuery = QueryConstructor.constructQuery<InterestEntity>(
      this.interestRepository,
      query,
    );
    const d = new DataResponseFormat<InterestResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => InterestResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }

  async getIntersetsByUser(
    userId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<InterestResponse>> {
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
      const dataQuery = QueryConstructor.constructQuery<InterestEntity>(
        this.interestRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<InterestResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => InterestResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }
  async getInterestsByEvent(
    eventId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<InterestResponse>> {
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
      const dataQuery = QueryConstructor.constructQuery<InterestEntity>(
        this.interestRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<InterestResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => InterestResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }
}
