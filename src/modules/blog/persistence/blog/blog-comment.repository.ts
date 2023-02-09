import { BlogComment } from '@blog/domains/blog/blog-comment';
import { IBlogCommentRepository } from '@blog/domains/blog/blog-comment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogCommentEntity } from './blog-comment.entity';

export class BlogCommentRepository implements IBlogCommentRepository {
  constructor(
    @InjectRepository(BlogCommentEntity)
    private blogCommentRepository: Repository<BlogCommentEntity>,
  ) {}

  async insert(blogComment: BlogComment): Promise<BlogComment> {
    const blogCommentEntity = this.toBlogCommentEntity(blogComment);
    const result = await this.blogCommentRepository.save(blogCommentEntity);
    return result ? this.toBlogComment(result) : null;
  }
  async update(id: string, blogComment: BlogComment): Promise<BlogComment> {
    const blogCommentEntity = this.toBlogCommentEntity(blogComment);
    const result = await this.blogCommentRepository.save(blogCommentEntity);
    return result ? this.toBlogComment(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.blogCommentRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<BlogComment[]> {
    const blogComments = await this.blogCommentRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!blogComments.length) {
      return null;
    }
    return blogComments.map((blogComment) => this.toBlogComment(blogComment));
  }
  async getById(id: string, withDeleted: boolean): Promise<BlogComment> {
    const blogComment = await this.blogCommentRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!blogComment[0]) {
      return null;
    }
    return this.toBlogComment(blogComment[0]);
  }

  toBlogComment(blogCommentEntity: BlogCommentEntity): BlogComment {
    const blogComment: BlogComment = new BlogComment();
    blogComment.id = blogCommentEntity.id;
    blogComment.blogId = blogCommentEntity.blogId;
    blogComment.userId = blogCommentEntity.userId;
    blogComment.description = blogCommentEntity.description;
    return blogComment;
  }
  toBlogCommentEntity(blogComment: BlogComment): BlogCommentEntity {
    const blogCommentEntity: BlogCommentEntity = new BlogCommentEntity();
    blogCommentEntity.id = blogComment.id;
    blogCommentEntity.blogId = blogComment.blogId;
    blogCommentEntity.userId = blogComment.userId;
    blogCommentEntity.description = blogComment.description;
    return blogCommentEntity;
  }
}
