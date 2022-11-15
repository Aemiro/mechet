import { FileManagerHelper } from '@libs/common/file-manager/utils/file-manager-helper';
import { FileResponseDto } from '@libs/common/file-manager/dtos/file-response.dto';
import { FileManagerService } from '@libs/common/file-manager';
import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('/')
@Controller('/')
export class AppController {
  constructor(private readonly fileManagerService: FileManagerService) {}

  @Get('download-file')
  async downloadFile(
    @Query() file: FileResponseDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const stream = await this.fileManagerService.downloadFile(
      file,
      response,
      FileManagerHelper.UPLOADED_FILES_DESTINATION,
    );

    response.set({
      'Content-Disposition': `inline; filename="${file.originalname}"`,
      'Content-Type': file.mimetype,
    });

    return new StreamableFile(stream);
  }
}
