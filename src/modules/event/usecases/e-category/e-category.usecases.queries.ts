import { ECategoryEntity } from '@event/persistence/e-category/e-category.entity';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { FilterOperators } from '@libs/collection-query/filter_operators';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ECategoryResponse } from './e-category.response';

export class CategoryQueries {
  constructor(
    @InjectRepository(ECategoryEntity)
    private categoryRepository: Repository<ECategoryEntity>,
  ) {}

  async getCategory(
    id: string,
    withDeleted = false,
  ): Promise<ECategoryResponse> {
    const category = await this.categoryRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!category[0]) {
      throw new NotFoundException(`category not found with id ${id}`);
    }
    return ECategoryResponse.fromEntity(category[0]);
  }

  async getCategories(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<ECategoryResponse>> {
    try {
      const dataQuery = QueryConstructor.constructQuery<ECategoryEntity>(
        this.categoryRepository,
        query,
      );
      const d = new DataResponseFormat<ECategoryResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => ECategoryResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }

  async getArchivedCategories(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<ECategoryResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<ECategoryEntity>(
      this.categoryRepository,
      query,
    );
    dataQuery.withDeleted();
    const d = new DataResponseFormat<ECategoryResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => ECategoryResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
}
