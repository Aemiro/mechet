import { FileDto } from '@libs/common/file-dto';

export class Blog {
  id: string;
  branchId: string;
  categoryId: string;
  title: string;
  description: string;
  views: number;
  coverImage: FileDto;
  isPublished: boolean;
  publishedDate: Date;
  tags: string[];
}
