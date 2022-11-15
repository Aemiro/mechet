import { ApiProperty } from '@nestjs/swagger';

export class FileResponseDto {
  @ApiProperty()
  filename: string;
  @ApiProperty()
  path: string;
  //@ApiProperty()
  originalname: string;
  @ApiProperty()
  mimetype: string;
  // @ApiProperty()
  size: number;

  constructor(
    filename: string,
    path: string,
    originalname: string,
    mimetype: string,
    size: number,
  ) {
    this.filename = filename;
    this.path = path;
    this.originalname = originalname;
    this.mimetype = mimetype;
    this.size = size;
  }
}
