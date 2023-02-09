import { Blog } from '@blog/domains/blog/blog';
import { BlogComment } from '@blog/domains/blog/blog-comment';
import { BlogCommentRepository } from '@blog/persistence/blog/blog-comment.repository';
import { BlogRepository } from '@blog/persistence/blog/blog.repository';
import { FileDto } from '@libs/common/file-dto';
import {
  FileManagerHelper,
  FileManagerService,
  FileResponseDto,
} from '@libs/common/file-manager';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateBlogCommentCommand,
  UpdateBlogCommentCommand,
} from './blog-comment.commands';
import { BlogCommentResponse } from './blog-comment.response';
import { CreateBlogCommand, UpdateBlogCommand } from './blog.commands';
import { BlogResponse } from './blog.response';

@Injectable()
export class BlogCommands {
  private blogDomain = new Blog();
  constructor(
    private blogRepository: BlogRepository,
    private blogCommentRepository: BlogCommentRepository,
    private readonly fileManagerService: FileManagerService,
  ) {}

  async createBlog(command: CreateBlogCommand): Promise<BlogResponse> {
    this.blogDomain = CreateBlogCommand.fromCommands(command);
    const result = await this.blogRepository.insert(this.blogDomain);
    return BlogResponse.fromDomain(result);
  }
  async addBlogView(
    id: string,
    createBlogCommand: CreateBlogCommand,
  ): Promise<BlogResponse> {
    const eventView = CreateBlogCommand.fromCommands(createBlogCommand);
    this.blogDomain = await this.blogRepository.getById(id);
    this.blogDomain.views++;

    const result = await this.blogRepository.update(id, this.blogDomain);
    if (result) {
      return BlogResponse.fromDomain(result);
    }
  }
  async updateBlog(
    id: string,
    command: UpdateBlogCommand,
  ): Promise<BlogResponse> {
    this.blogDomain = await this.blogRepository.getById(command.id, true);
    if (this.blogDomain != null) {
      this.blogDomain = UpdateBlogCommand.fromCommands(command);
      const result = await this.blogRepository.update(id, this.blogDomain);
      return BlogResponse.fromDomain(result);
    }
  }

  async DeleteBlog(id: string): Promise<boolean> {
    this.blogDomain = await this.blogRepository.getById(id, true);
    if (!this.blogDomain) {
      throw new NotFoundException(`blog not found with id ${id}`);
    }
    const result = await this.blogRepository.delete(id);

    return result;
  }

  async ArchiveBlog(id: string): Promise<boolean> {
    this.blogDomain = await this.blogRepository.getById(id, true);
    if (!this.blogDomain) {
      throw new NotFoundException(`blog not found with id ${id}`);
    }
    return await this.blogRepository.archive(id);
  }

  async RestoreBlog(id: string): Promise<BlogResponse> {
    this.blogDomain = await this.blogRepository.getById(id, true);
    if (!this.blogDomain) {
      throw new NotFoundException(`blog not found with id ${id}`);
    }
    const result = await this.blogRepository.restore(id);
    if (result) {
      this.blogDomain.deletedAt = null;
    }
    return BlogResponse.fromDomain(this.blogDomain);
  }

  async addBlogCoverImage(id: string, fileDto: FileResponseDto) {
    this.blogDomain = await this.blogRepository.getById(id, true);
    if (!this.blogDomain) {
      throw new NotFoundException(`blog not found with id ${id}`);
    }
    if (this.blogDomain.coverImage && fileDto) {
      await this.fileManagerService.removeFile(
        this.blogDomain.coverImage,
        FileManagerHelper.UPLOADED_FILES_DESTINATION,
      );
    }
    this.blogDomain.coverImage = fileDto as FileDto;
    const result = await this.blogRepository.update(id, this.blogDomain);
    return BlogResponse.fromDomain(result);
  }

  async addBlogComment(
    command: CreateBlogCommentCommand,
  ): Promise<BlogCommentResponse> {
    const blogDomain = await this.blogRepository.getById(command.blogId);
    if (!blogDomain) {
      throw new NotFoundException(
        `blog comment not found with id ${command.blogId}`,
      );
    }
    const blogComment = CreateBlogCommentCommand.fromCommands(command);
    const result = await this.blogCommentRepository.insert(blogComment);
    if (result) {
      return BlogCommentResponse.fromDomain(result);
    }
    return null;
  }
  async updateBlogComment(
    id: string,
    command: UpdateBlogCommentCommand,
  ): Promise<BlogCommentResponse> {
    const blogDomain = await this.blogRepository.getById(command.blogId);
    if (!blogDomain) {
      throw new NotFoundException(
        `Blog comment not found with id ${command.blogId}`,
      );
    }

    const blogComment = UpdateBlogCommentCommand.fromCommands(command);
    const result = await this.blogCommentRepository.update(id, blogComment);
    if (result) {
      return BlogCommentResponse.fromDomain(result);
    }

    return null;
  }
  async removeBlogComment(id: string): Promise<boolean> {
    const blogDomain = await this.blogRepository.getById(id);
    if (!blogDomain) {
      throw new NotFoundException(`blog comment not found with id ${id}`);
    }
    const result = await this.blogCommentRepository.delete(id);

    return result;
  }
}
