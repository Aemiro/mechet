import { FileDto } from '@libs/common/file-dto';
import { BlogComment } from './blog-comment';

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
  blogComments: BlogComment[];
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
