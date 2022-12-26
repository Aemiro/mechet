import { CollectionQuery } from '@libs/collection-query/collection-query';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PCategoryEntity } from '@partner/persistence/p-category/p-category.entity';
import { Repository } from 'typeorm';
import { PCategoryResponse } from './p-category.response';

export class PCategoryQueries {
  constructor(
    @InjectRepository(PCategoryEntity)
    private categoryRepository: Repository<PCategoryEntity>,
  ) {}

  async getCategory(
    id: string,
    withDeleted = false,
  ): Promise<PCategoryResponse> {
    const category = await this.categoryRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });

    if (!category[0]) {
      throw new NotFoundException(` Category with ${id} not found`);
    }
    return PCategoryResponse.fromEntity(category[0]);
  }

  async fetchCategories(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<PCategoryResponse>> {
    try {
      const dataQuery = QueryConstructor.constructQuery<PCategoryEntity>(
        this.categoryRepository,
        query,
      );
      const d = new DataResponseFormat<PCategoryResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => PCategoryResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }

  async getArchivedCategories(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<PCategoryResponse>> {
    const dataQuery = QueryConstructor.constructQuery<PCategoryEntity>(
      this.categoryRepository,
      query,
    );
    dataQuery.withDeleted();
    dataQuery.andWhere('categories.deleted_at IS NOT NULL');
    const d = new DataResponseFormat<PCategoryResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => PCategoryResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  catch(error) {
    throw new BadRequestException(error.code, error.message);
  }
}
