import { BCategoryEntity } from '@blog/persistence/b-category/b-category.entity';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { FilterOperators } from '@libs/collection-query/filter_operators';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BCategoryResponse } from './b-category.response';

export class BCategoryQueries {
  constructor(
    @InjectRepository(BCategoryEntity)
    private categoryRepository: Repository<BCategoryEntity>,
  ) {}

  async getCategory(
    id: string,
    withDeleted = false,
  ): Promise<BCategoryResponse> {
    const category = await this.categoryRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!category[0]) {
      throw new NotFoundException(`category not found with id ${id}`);
    }
    return BCategoryResponse.fromEntity(category[0]);
  }

  async getCategories(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<BCategoryResponse>> {
    try {
      const dataQuery = QueryConstructor.constructQuery<BCategoryEntity>(
        this.categoryRepository,
        query,
      );
      const d = new DataResponseFormat<BCategoryResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => BCategoryResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }

  async getArchivedCategories(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<BCategoryResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<BCategoryEntity>(
      this.categoryRepository,
      query,
    );
    dataQuery.withDeleted();
    const d = new DataResponseFormat<BCategoryResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => BCategoryResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
}
