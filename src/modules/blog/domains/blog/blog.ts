import { FileDto } from '@libs/common/file-dto';
import { BlogCategory } from './blog-category';
import { BlogComment } from './blog-comment';

export class Blog {
  id: string;
  branchId: string;
  title: string;
  description: string;
  views: number;
  coverImage: FileDto;
  isPublished: boolean;
  publishedDate: Date;
  tags: string[];
  blogComments: BlogComment[];
  blogCategories: BlogCategory[];
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;

  //Blog Comment
  async addBlogComment(blogComment: BlogComment) {
    this.blogComments.push(blogComment);
  }

  async updateBlogComment(blogComment: BlogComment) {
    const existIndex = this.blogComments.findIndex(
      (element) => element.id == blogComment.id,
    );
    this.blogComments[existIndex] = blogComment;
  }

  async removeBlogComment(id: string) {
    this.blogComments = this.blogComments.filter((element) => element.id != id);
  }

  async updateBlogComments(blogComments: BlogComment[]) {
    this.blogComments = blogComments;
  }
}
