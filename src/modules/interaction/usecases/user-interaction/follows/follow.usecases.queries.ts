import { FollowEntity } from '@interaction/persistence/user-interaction/follows/follow.entity';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { FilterOperators } from '@libs/collection-query/filter_operators';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowResponse } from './follow.response';

@Injectable()
export class FollowQueries {
  constructor(
    @InjectRepository(FollowEntity)
    private followRepository: Repository<FollowEntity>,
  ) {}

  async getFavoritesByUser(
    userId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<FollowResponse>> {
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
      const dataQuery = QueryConstructor.constructQuery<FollowEntity>(
        this.followRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<FollowResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => FollowResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }
  async getFavoritesByEvent(
    branchId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<FollowResponse>> {
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
      const dataQuery = QueryConstructor.constructQuery<FollowEntity>(
        this.followRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<FollowResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => FollowResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }
}
