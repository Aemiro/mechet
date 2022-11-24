import { FileDto } from '@libs/common/file-dto';

export class BlogCategory {
  id: string;
  name: string;
  description: string;
  coverImage: FileDto;
}
