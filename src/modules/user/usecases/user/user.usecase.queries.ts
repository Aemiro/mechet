import { BlogCommentEntity } from '@blog/persistence/blog/blog-comment.entity';
import { BlogCommentResponse } from '@blog/usecases/blog/blog-comment.response';
import { EventCommentEntity } from '@event/persistence/event/event-comment.entity';
import { EventCommentResponse } from '@event/usecases/event/event-comment.response';
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
import { UserEntity } from '@user/persistence/users/user.entity';
import { Repository } from 'typeorm';
import { UserResponse } from './user.response';
@Injectable()
export class UserQueries {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(EventCommentEntity)
    private eventCommentRepository: Repository<EventCommentEntity>,
    @InjectRepository(BlogCommentEntity)
    private blogCommentRepository: Repository<BlogCommentEntity>,
  ) {}
  async getUser(id: string, withDeleted = false): Promise<UserResponse> {
    const user = await this.userRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!user[0]) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    return UserResponse.fromEntity(user[0]);
  }
  async getUsers(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<UserResponse>> {
    const dataQuery = QueryConstructor.constructQuery<UserEntity>(
      this.userRepository,
      query,
    );
    const d = new DataResponseFormat<UserResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => UserResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getArchivedUsers(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<UserResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<UserEntity>(
      this.userRepository,
      query,
    );
    dataQuery.withDeleted();
    const d = new DataResponseFormat<UserResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => UserResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getEventCommentsByUSer(
    userId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<EventCommentResponse>> {
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
      const dataQuery = QueryConstructor.constructQuery<EventCommentEntity>(
        this.eventCommentRepository,
        query,
      );
      console.log(dataQuery.getSql(), dataQuery.getParameters());
      const d = new DataResponseFormat<EventCommentResponse>();
      if (query.count) {
        d.count = await dataQuery.getCount();
      } else {
        const [result, total] = await dataQuery.getManyAndCount();
        d.data = result.map((entity) =>
          EventCommentResponse.fromEntity(entity),
        );
        d.count = total;
      }
      return d;
    } catch (error) {
      throw new BadRequestException(error.code, error.message);
    }
  }

  async getBlogCommentsByUser(
    userId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<BlogCommentResponse>> {
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
