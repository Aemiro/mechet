import { EventEntity } from '@event/persistence/event/event.entity';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { FilterOperators } from '@libs/collection-query/filter_operators';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventResponse } from './event.response';

export class EventQueries {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
  ) {}

  async getEvent(id: string, withDeleted = false): Promise<EventResponse> {
    const event = await this.eventRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!event[0]) {
      throw new NotFoundException(`event not found with id ${id}`);
    }
    return EventResponse.fromEntity(event[0]);
  }

  async getEvents(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<EventResponse>> {
    const dataQuery = QueryConstructor.constructQuery<EventEntity>(
      this.eventRepository,
      query,
    );
    const d = new DataResponseFormat<EventResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => EventResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }

  async getArchivedEvents(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<EventResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<EventEntity>(
      this.eventRepository,
      query,
    );
    dataQuery.withDeleted();
    const d = new DataResponseFormat<EventResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => EventResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
}
