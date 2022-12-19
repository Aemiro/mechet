import { CollectionQuery } from '@libs/collection-query/collection-query';
import {
  FileManagerHelper,
  FileManagerService,
} from '@libs/common/file-manager';
import { ApiPaginatedResponse } from '@libs/response-format/api-paginated-response';
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
import {
  CreatePartnerCommand,
  UpdatePartnerCommand,
} from '@partner/usecases/partner/partner.commands';
import { PartnerCommands } from '@partner/usecases/partner/partner.usecases.commands';
import { PartnerQueries } from '@partner/usecases/partner/partner.usecases.queries';
import { PartnerResponse } from '@partner/usecases/partner/partners.response';
import { diskStorage } from 'multer';

@Controller('partners')
@ApiTags('partners')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class PartnerController {
  constructor(
    private command: PartnerCommands,
    private partnerQuery: PartnerQueries,
    private readonly fileManagerService: FileManagerService,
  ) {}

  @Get('get-partner/:id')
  @ApiOkResponse({ type: PartnerResponse })
  async getPartner(@Param('id') id: string) {
    return this.partnerQuery.getPartner(id);
  }

  @Get('get-archived-partner/:id')
  @ApiOkResponse({ type: PartnerResponse })
  async getArchivedPartner(@Param('id') id: string) {
    return this.partnerQuery.getPartner(id, true);
  }

  @Get('get-archived-partners')
  @ApiPaginatedResponse(PartnerResponse)
  async getArchivedPartners(@Query() query: CollectionQuery) {
    return this.partnerQuery.getArchivedPartners(query);
  }

  @Get('get-partners')
  @ApiPaginatedResponse(PartnerResponse)
  async getPartners(@Query() query: CollectionQuery) {
    return this.partnerQuery.getPartners(query);
  }

  @Post('create-partner')
  @ApiOkResponse({ type: PartnerResponse })
  async createPartner(@Body() createPartnerCommand: CreatePartnerCommand) {
    return await this.command.createPartner(createPartnerCommand);
  }

  @Put('updated-partner')
  @ApiOkResponse({ type: PartnerResponse })
  async updatePartner(
    @Param('id') id: string,
    @Body() updatePartnerCommand: UpdatePartnerCommand,
  ) {
    return await this.command.updatePartner(id, updatePartnerCommand);
  }

  @Delete('archive-partner/:id')
  @ApiOkResponse({ type: Boolean })
  async archivePartner(@Param('id') id: string) {
    return await this.command.archivePartner(id);
  }

  // @Delete('delete-partner/:id')
  // @ApiOkResponse({ type: Boolean })
  // async deletePartner(@Param('id') id: string) {
  //   return await this.command.deletePartner(id);
  // }

  @Post('restore-partner/:id')
  @ApiOkResponse({ type: PartnerResponse })
  async restorePartner(@Param('id') id: string) {
    return await this.command.restorePartner(id);
  }

  // @Post('update-cover/:id')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(
  //   FileInterceptor('coverImage', {
  //     storage: diskStorage({
  //       destination: FileManagerHelper.UPLOADED_FILES_DESTINATION,
  //     }),
  //     fileFilter: (request, file, callback) => {
  //       if (!file.mimetype.includes('image')) {
  //         return callback(
  //           new BadRequestException('Provide a valid image'),
  //           false,
  //         );
  //       }
  //       callback(null, true);
  //     },
  //     limits: { fileSize: Math.pow(1024, 2) },
  //   }),
  // )
  // async addCoverImage(
  //   @Param('id') id: string,
  //   @UploadedFile() coverImage: Express.Multer.File,
  // ) {
  //   if (coverImage) {
  //     const result = await this.fileManagerService.uploadFile(
  //       coverImage,
  //       FileManagerHelper.UPLOADED_FILES_DESTINATION,
  //     );
  //     if (result) {
  //       return this.command.updatePartnerCoverImage(id, result);
  //     }
  //   }
  //   throw new BadRequestException(`Bad Request`);
  // }
}
