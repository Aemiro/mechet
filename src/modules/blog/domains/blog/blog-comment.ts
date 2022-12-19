export class BlogComment {
  id: string;
  userId: string;
  blogId: string;
  description: string;

  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
