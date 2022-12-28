import { FileDto } from '@libs/common/file-dto';
import { BlogCategory } from '../blog/blog-category';

export class BCategory {
  id: string;
  name: string;
  description: string;
  coverImage: FileDto;
  blogCategories: BlogCategory[];
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
