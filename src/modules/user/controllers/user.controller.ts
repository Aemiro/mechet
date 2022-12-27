import { CollectionQuery } from '@libs/collection-query/collection-query';
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
import {
  ApiConsumes,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiPaginatedResponse } from '@libs/response-format/api-paginated-response';
import {
  FileManagerHelper,
  FileManagerService,
} from '@libs/common/file-manager';
import { diskStorage } from 'multer';
import {
  CreateUserCommand,
  UpdateUserCommand,
} from '../usecases/user/user.commands';
import { UserResponse } from '../usecases/user/user.response';
import { UserCommands } from '../usecases/user/user.usecase.commands';
import { UserQueries } from '../usecases/user/user.usecase.queries';

@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class UsersController {
  constructor(
    private commands: UserCommands,
    private queries: UserQueries,
    private readonly fileManagerService: FileManagerService,
  ) {}
  @Get('get-user/:id')
  @ApiOkResponse({ type: UserResponse })
  async getUser(@Param('id') id: string) {
    return this.queries.getUser(id);
  }
  // @Get('get-archived-user/:id')
  // @ApiOkResponse({ type: UserResponse })
  // async getArchivedUser(@Param('id') id: string) {
  //   return this.queries.getUser(id, true);
  // }
  @Get('get-users')
  @ApiPaginatedResponse(UserResponse)
  async getUsers(@Query() query: CollectionQuery) {
    return this.queries.getUsers(query);
  }

  @Get('get-archived-users')
  @ApiPaginatedResponse(UserResponse)
  async getArchivedUsers(@Query() query: CollectionQuery) {
    return this.queries.getArchivedUsers(query);
  }
  @Post('create-user')
  @ApiOkResponse({ type: UserResponse })
  async createUser(@Body() createUserCommand: CreateUserCommand) {
    return this.commands.createUser(createUserCommand);
  }
  @Put('update-user')
  @ApiOkResponse({ type: UserResponse })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserCommand: UpdateUserCommand,
  ) {
    return this.commands.updateUser(id, updateUserCommand);
  }

  @Delete('archive-user/:id')
  @ApiOkResponse({ type: Boolean })
  async archiveUser(@Param('id') id: string) {
    return this.commands.archiveUser(id);
  }
  @Delete('delete-user/:id')
  @ApiOkResponse({ type: Boolean })
  async deleteUser(@Param('id') id: string) {
    return this.commands.deleteUser(id);
  }
  @Post('restore-user/:id')
  @ApiOkResponse({ type: UserResponse })
  async restoreUser(@Param('id') id: string) {
    return this.commands.restoreUser(id);
  }

  @Post('block-user/:id')
  @ApiOkResponse({ type: UserResponse })
  async blockUser(@Param('id') id: string) {
    return this.commands.blockUser(id);
  }
  @Post('activate-user/:id')
  @ApiOkResponse({ type: UserResponse })
  async activateUser(@Param('id') id: string) {
    return this.commands.activateUser(id);
  }
  @Post('add-profile/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('profileImage', {
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
  async addProfileImage(
    @Param('id') id: string,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    if (profileImage) {
      const result = await this.fileManagerService.uploadFile(
        profileImage,
        FileManagerHelper.UPLOADED_FILES_DESTINATION,
      );
      if (result) {
        return this.commands.addUserProfileImage(id, result);
      }
    }
    throw new BadRequestException(`Bad Request`);
  }
}
