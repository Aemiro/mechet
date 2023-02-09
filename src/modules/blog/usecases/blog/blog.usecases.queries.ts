import { BlogCommentEntity } from '@blog/persistence/blog/blog-comment.entity';
import { BlogEntity } from '@blog/persistence/blog/blog.entity';
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
import { BlogCommentResponse } from './blog-comment.response';
import { BlogResponse } from './blog.response';

@Injectable()
export class BlogQueries {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
    @InjectRepository(BlogCommentEntity)
    private blogCommentRepository: Repository<BlogCommentEntity>,
  ) {}
  async getBlog(id: string, withDeleted = false): Promise<BlogResponse> {
    const blog = await this.blogRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!blog[0]) {
      throw new NotFoundException(`blog not found with id ${id}`);
    }
    return BlogResponse.fromEntity(blog[0]);
  }

  async getBlogs(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<BlogResponse>> {
    const dataQuery = QueryConstructor.constructQuery<BlogEntity>(
      this.blogRepository,
      query,
    );
    const d = new DataResponseFormat<BlogResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => BlogResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getArchivedBlogs(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<BlogResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<BlogEntity>(
      this.blogRepository,
      query,
    );
    dataQuery.withDeleted();
    const d = new DataResponseFormat<BlogResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => BlogResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getBlogsByBranch(
    branchId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<BlogResponse>> {
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
      const dataQuery = QueryConstructor.constructQuery<BlogEntity>(
        this.blogRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<BlogResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => BlogResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }

  async getBlogCommentsByBlog(
    blogId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<BlogCommentResponse>> {
    try {
      if (!query.filter) {
        query.filter = [];
      }
      query.filter.push([
        {
          field: 'blog_id',
          operator: FilterOperators.EqualTo,
          value: blogId,
        },
      ]);
      const dataQuery = QueryConstructor.constructQuery<BlogCommentEntity>(
        this.blogCommentRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<BlogCommentResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) => BlogCommentResponse.fromEntity(entity));
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }
}
