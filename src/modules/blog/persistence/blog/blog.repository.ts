import { Blog } from '@blog/domains/blog/blog';
import { BlogComment } from '@blog/domains/blog/blog-comment';
import { IBlogRepository } from '@blog/domains/blog/blog.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogEntity } from './blog.entity';

export class BlogRepository implements IBlogRepository {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
  ) {}
  async insert(blog: Blog): Promise<Blog> {
    const blogEntity = this.toBlogEntity(blog);
    const result = await this.blogRepository.save(blogEntity);
    return result ? this.toBlog(result) : null;
  }
  async update(id: string, blog: Blog): Promise<Blog> {
    const blogEntity = this.toBlogEntity(blog);
    const result = await this.blogRepository.save(blogEntity);
    return result ? this.toBlog(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.blogRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted = false): Promise<Blog[]> {
    const blogs = await this.blogRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!blogs.length) {
      return null;
    }
    return blogs.map((blog) => this.toBlog(blog));
  }
  async getById(id: string, withDeleted = false): Promise<Blog> {
    const blog = await this.blogRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!blog[0]) {
      return null;
    }
    return this.toBlog(blog[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.blogRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.blogRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }

  toBlog(blogEntity: BlogEntity): Blog {
    const blog: Blog = new Blog();
    blog.id = blogEntity.id;
    blog.branchId = blogEntity.branchId;
    blog.title = blogEntity.title;
    blog.description = blogEntity.description;
    blog.views = blogEntity.views;
    blog.coverImage = blogEntity.coverImage;
    blog.isPublished = blogEntity.isPublished;
    blog.publishedDate = blogEntity.publishedDate;
    blog.tags = blogEntity.tags;
    blog.blogComments = blogEntity.blogComments
      ? blogEntity.blogComments.map((element) => this.toBlogComment(element))
      : [];
    blog.createdBy = blogEntity.createdBy;
    blog.updatedBy = blogEntity.updatedBy;
    blog.deletedBy = blogEntity.deletedBy;
    blog.createdAt = blogEntity.createdAt;
    blog.updatedAt = blogEntity.updatedAt;
    blog.deletedAt = blogEntity.deletedAt;

    return blog;
  }
  toBlogEntity(blog: Blog): BlogEntity {
    const blogEntity: BlogEntity = new BlogEntity();
    blogEntity.id = blog.id;
    blogEntity.branchId = blog.branchId;
    blogEntity.title = blog.title;
    blogEntity.description = blog.description;
    blogEntity.views = blog.views;
    blogEntity.coverImage = blog.coverImage;
    blogEntity.isPublished = blog.isPublished;
    blogEntity.publishedDate = blog.publishedDate;
    blogEntity.tags = blog.tags;
    blogEntity.blogComments = blog.blogComments
      ? blog.blogComments.map((element) => this.toBlogCommentEntity(element))
      : [];
    blogEntity.createdBy = blog.createdBy;
    blogEntity.updatedBy = blog.updatedBy;
    blogEntity.deletedBy = blog.deletedBy;
    blogEntity.createdAt = blog.createdAt;
    blogEntity.updatedAt = blog.updatedAt;
    blogEntity.deletedAt = blog.deletedAt;
    return blogEntity;
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
