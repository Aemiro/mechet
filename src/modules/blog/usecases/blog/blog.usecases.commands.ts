import { Blog } from "@blog/domains/blog/blog";
import { BlogRepository } from "@blog/persistence/blog/blog.repository";
import { FileDto } from "@libs/common/file-dto";
import { FileManagerHelper, FileManagerService, FileResponseDto } from "@libs/common/file-manager";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBlogCommand, UpdateBlogCommand } from "./blog.commands";
import { BlogResponse } from "./blog.response";

@Injectable()
export class BlogCommands {
  private blogDomain = new Blog();
  constructor(
    private blogRepository: BlogRepository,
    private readonly fileManagerService: FileManagerService,
  ) { }

  async createBlog(command: CreateBlogCommand) 
: Promise<BlogResponse> {
    const blog = CreateBlogCommand.fromCommands(command);
    const result = await this.blogRepository.insert(blog);
    return BlogResponse.fromDomain(result);
  }
  async updateBlog(id: string,command: UpdateBlogCommand) 
    : Promise<BlogResponse> {
    let blog = await this.blogRepository.getById(command.id,true);
    if (blog!= null) {
       blog = UpdateBlogCommand.fromCommands(command);
    const result = await this.blogRepository.update(id,blog);
    return BlogResponse.fromDomain(result);
    }
    
  }

   async DeleteBlog(id: string): Promise<boolean> {
    const blog = await this.blogRepository.getById(id, true);
    if (!blog) {
      throw new NotFoundException(`blog not found with id ${id}`);
    }
    const result = await this.blogRepository.delete(id);

    return result;
  }

  async ArchiveBlog(id: string): Promise<boolean> {
    const blog = await this.blogRepository.getById(id, true);
    if (!blog) {
      throw new NotFoundException(`blog not found with id ${id}`);
    }
    return await this.blogRepository.archive(id);
  }

  async RestoreBlog(id: string): Promise<BlogResponse> {
    const blog = await this.blogRepository.getById(id, true);
    if (!blog) {
      throw new NotFoundException(`blog not found with id ${id}`);
    }
    const result = await this.blogRepository.restore(id);
    if (result) {
      blog.deletedAt = null;
    }
    return BlogResponse.fromDomain(blog);
  }

   async addBlogCoverImage(id: string, fileDto: FileResponseDto) {
    const blogDomain = await this.blogRepository.getById(id, true);
    if (!blogDomain) {
      throw new NotFoundException(`blog not found with id ${id}`);
    }
    if (blogDomain.coverImage && fileDto) {
      await this.fileManagerService.removeFile(
        blogDomain.coverImage,
        FileManagerHelper.UPLOADED_FILES_DESTINATION,
      );
    }
    blogDomain.coverImage = fileDto as FileDto;
    const result = await this.blogRepository.update(id, blogDomain);
    return BlogResponse.fromDomain(result);
  }
}
