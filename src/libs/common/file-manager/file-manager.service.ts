import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { createReadStream, ReadStream } from 'fs';
import { FileResponseDto } from './dtos/file-response.dto';
import * as fs from 'fs';
import 'multer';

@Injectable()
export class FileManagerService {
  // constructor(private readonly sftpClient: SftpClientService) {}

  async downloadFile(
    file: FileResponseDto,
    response: Response,
    basePath: string,
  ): Promise<ReadStream> {
    // const downloadPath = await this.sftpClient.download(
    //   `${basePath}/${file.filename}`,
    //   file.path
    // );
    const downloadPath = `${basePath}/${file.filename}`;

    const readStream = createReadStream(downloadPath.toString());

    readStream.pipe(response).once('close', async function () {
      readStream.destroy();
      // await fs.unlink(downloadPath.toString());
    });

    return readStream;
  }

  async uploadFile(
    file: Express.Multer.File,
    basePath: string,
  ): Promise<FileResponseDto> {
    return await this.uploadToRemoteFileServer(file, basePath);
  }

  async uploadFiles(
    files: Express.Multer.File[],
    basePath: string,
  ): Promise<FileResponseDto[]> {
    const responses: FileResponseDto[] = [];

    files.forEach(async (file) => {
      const response = await this.uploadToRemoteFileServer(file, basePath);
      responses.push(response);
    });

    return responses;
  }

  private async uploadToRemoteFileServer(
    file: Express.Multer.File,
    basePath: string,
  ): Promise<FileResponseDto> {
    // const folderExists = await this.sftpClient.exists(basePath);
    // if (!folderExists) {
    //   await this.sftpClient.makeDirectory(basePath);
    // }

    // await this.sftpClient.upload(file.path, `${basePath}/${file.filename}`, {
    //   flags: 'w',
    //   encoding: null,
    //   mode: 0o666,
    // });

    //await fs.unlink(file.path);

    return new FileResponseDto(
      file.filename,
      file.path,
      file.originalname,
      file.mimetype,
      file.size,
    );
  }
  async removeFile(file: FileResponseDto, basePath: string) {
    const downloadPath = `${basePath}/${file.filename}`;
    fs.access(downloadPath, (err) => {
      if (!err) {
        fs.unlink(downloadPath, (err) => {
          console.log(err);
        });
      }
    });
  }
}
