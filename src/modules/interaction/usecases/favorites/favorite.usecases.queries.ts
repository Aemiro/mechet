import { FavoriteEntity } from '@interaction/persistence/favorites/favorite.entity';
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
import { FavoriteResponse } from './favorite.response';

@Injectable()
export class FavoriteQueries {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
  ) {}
  async getFavorite(
    id: string,
    withDeleted = false,
  ): Promise<FavoriteResponse> {
    const favorite = await this.favoriteRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!favorite[0]) {
      throw new NotFoundException(`favorite not found with id ${id}`);
    }
    return FavoriteResponse.fromEntity(favorite[0]);
  }

  async getFavorites(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<FavoriteResponse>> {
    const dataQuery = QueryConstructor.constructQuery<FavoriteEntity>(
      this.favoriteRepository,
      query,
    );
    const d = new DataResponseFormat<FavoriteResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => FavoriteResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getFavoritesByUser(
    userId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<FavoriteResponse>> {
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
      const dataQuery = QueryConstructor.constructQuery<FavoriteEntity>(
        this.favoriteRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<FavoriteResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => FavoriteResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }
  async getFavoritesByEvent(
    eventId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<FavoriteResponse>> {
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
      const dataQuery = QueryConstructor.constructQuery<FavoriteEntity>(
        this.favoriteRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<FavoriteResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => FavoriteResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }
}
