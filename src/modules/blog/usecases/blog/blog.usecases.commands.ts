import { Blog } from '@blog/domains/blog/blog';
import { BlogComment } from '@blog/domains/blog/blog-comment';
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
    private readonly fileManagerService: FileManagerService,
  ) {}

  async createBlog(command: CreateBlogCommand): Promise<BlogResponse> {
    this.blogDomain = CreateBlogCommand.fromCommands(command);
    const result = await this.blogRepository.insert(this.blogDomain);
    return BlogResponse.fromDomain(result);
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
  ): Promise<BlogResponse> {
    const blogDomain = await this.blogRepository.getById(command.blogId);
    if (!blogDomain) {
      throw new NotFoundException(
        `Blog comment not found with id ${command.blogId}`,
      );
    }

    const commentDomain = CreateBlogCommentCommand.fromCommands(command);
    blogDomain.addBlogComment(commentDomain);
    const result = await this.blogRepository.update(command.blogId, blogDomain);
    if (result) {
      return BlogResponse.fromDomain(result);
    }

    return null;
  }
  async updateBlogComment(
    command: UpdateBlogCommentCommand,
  ): Promise<BlogResponse> {
    const blogDomain = await this.blogRepository.getById(command.blogId);
    if (!blogDomain) {
      throw new NotFoundException(
        `Blog comment not found with id ${command.blogId}`,
      );
    }

    const commentDomain = UpdateBlogCommentCommand.fromCommands(command);
    blogDomain.updateBlogComment(commentDomain);
    const result = await this.blogRepository.update(command.blogId, blogDomain);
    if (result) {
      return BlogResponse.fromDomain(result);
    }

    return null;
  }
  async removeBlogComment(id: string): Promise<boolean> {
    const blogDomain = await this.blogRepository.getById(id);
    if (blogDomain) {
      await blogDomain.removeBlogComment(id);
      const result = await this.blogRepository.update(id, blogDomain);
      if (result) return true;
    }
    return false;
  }
}
