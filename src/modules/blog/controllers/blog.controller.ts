import {
  CreateBlogCommentCommand,
  UpdateBlogCommentCommand,
} from '@blog/usecases/blog/blog-comment.commands';
import { BlogCommentResponse } from '@blog/usecases/blog/blog-comment.response';
import {
  CreateBlogCommand,
  UpdateBlogCommand,
} from '@blog/usecases/blog/blog.commands';
import { BlogResponse } from '@blog/usecases/blog/blog.response';
import { BlogCommands } from '@blog/usecases/blog/blog.usecases.commands';
import { BlogQueries } from '@blog/usecases/blog/blog.usecases.queries';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import {
  FileManagerHelper,
  FileManagerService,
} from '@libs/common/file-manager';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { boolean } from 'joi';
import { diskStorage } from 'multer';
@Controller('blogs')
@ApiTags('blogs')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class BlogController {
  constructor(
    private commands: BlogCommands,
    private queries: BlogQueries,
    private readonly fileManagerService: FileManagerService,
  ) {}

  @Get('get-blog/:id')
  @ApiOkResponse({ type: BlogResponse })
  async getBlog(@Param('id') id: string) {
    return this.queries.getBlog(id);
  }
  @Get('get-blogs')
  @ApiOkResponse({ type: BlogResponse })
  async getBlogs(@Query() query: CollectionQuery) {
    return this.queries.getBlogs(query);
  }
  @Get('get-archived-blogs')
  @ApiOkResponse({ type: BlogResponse })
  async getArchivedBlogs(@Query() query: CollectionQuery) {
    return this.queries.getArchivedBlogs(query);
  }
  @Post('create-blog')
  @ApiOkResponse({ type: BlogResponse })
  async createBlog(@Body() createBlogCommand: CreateBlogCommand) {
    return this.commands.createBlog(createBlogCommand);
  }
  @Post('add-blog-view')
  @ApiOkResponse({ type: BlogResponse })
  async addBlogView(
    @Param('id') id: string,
    @Body() createBlogCommand: CreateBlogCommand,
  ) {
    return this.commands.addBlogView(id, createBlogCommand);
  }
  @Put('update-blog')
  @ApiOkResponse({ type: BlogResponse })
  async updateBlog(
    @Param('id') id: string,
    @Body() updateBlogCommand: UpdateBlogCommand,
  ) {
    return this.commands.updateBlog(id, updateBlogCommand);
  }
  @Delete('archive-blog/:id')
  @ApiOkResponse({ type: Boolean })
  async ArchiveBlog(@Param('id') id: string) {
    return this.commands.ArchiveBlog(id);
  }
  @Delete('delete-blog/:id')
  @ApiOkResponse({ type: Boolean })
  async DeleteBlog(@Param('id') id: string) {
    return this.commands.DeleteBlog(id);
  }
  @Post('restore-blog/:id')
  @ApiOkResponse({ type: BlogResponse })
  async RestoreBlog(@Param('id') id: string) {
    return this.commands.RestoreBlog(id);
  }

  @Post('add-cover/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('coverImage', {
      storage: diskStorage({
        destination: FileManagerHelper.UPLOADED_FILES_DESTINATION,
      }),
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
      limits: { fileSize: Math.pow(1024, 2) },
    }),
  )
  async addBlogCoverImage(
    @Param('id') id: string,
    @UploadedFile() coverImage: Express.Multer.File,
  ) {
    if (coverImage) {
      const result = await this.fileManagerService.uploadFile(
        coverImage,
        FileManagerHelper.UPLOADED_FILES_DESTINATION,
      );
      if (result) {
        return this.commands.addBlogCoverImage(id, result);
      }
    }
    throw new BadRequestException(`Bad Request`);
  }
  @Post('add-blog-comment')
  @ApiOkResponse({ type: BlogResponse })
  async addBlogComment(
    @Body() createBlogCommentCommand: CreateBlogCommentCommand,
  ) {
    return this.commands.addBlogComment(createBlogCommentCommand);
  }
  @Put('update-blog-comment')
  @ApiOkResponse({ type: BlogResponse })
  async updateBlogComment(
    @Param('id') id: string,
    @Body() updateBlogCommentCommand: UpdateBlogCommentCommand,
  ) {
    return this.commands.updateBlogComment(id, updateBlogCommentCommand);
  }
  @Delete('remove-blog-comment/:id')
  @ApiOkResponse({ type: Boolean })
  async removeBlogComment(@Param('id') id: string) {
    return this.commands.removeBlogComment(id);
  }
  @Get('get-blog-comments')
  @ApiOkResponse({ type: BlogCommentResponse })
  async getBlogCommentsByBlog(
    @Param('blogId') blogId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.queries.getBlogCommentsByBlog(blogId, query);
  }
}
