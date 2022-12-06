import { CollectionQuery } from '@libs/collection-query/collection-query';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@partner/persistence/category/category.entity';
import { Repository } from 'typeorm';
import { CategoryResponse } from './category.response';

export class CategoryQueries {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategory(id: string): Promise<CategoryResponse> {
    const entity = await this.categoryRepository.find({
      where: { id: id },
      relations: ['partner_categories'],
    });
    if (!entity) {
      throw new NotFoundException(` Category with ${id} not found`);
    }
    return CategoryResponse.fromEntity(entity[0]);
  }

  async fetchCategories(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<CategoryResponse>> {
    try {
      const dataQuery = QueryConstructor.constructQuery<CategoryEntity>(
        this.categoryRepository,
        query,
      );
      const d = new DataResponseFormat<CategoryResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => CategoryResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }

  async getArchivedCategories(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<CategoryResponse>> {
    const dataQuery = QueryConstructor.constructQuery<CategoryEntity>(
      this.categoryRepository,
      query,
    );
    dataQuery.withDeleted();
    dataQuery.andWhere('categories.deleted_at IS NOT NULL');
    const d = new DataResponseFormat<CategoryResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => CategoryResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  catch(error) {
    throw new BadRequestException(error.code, error.message);
  }
}
