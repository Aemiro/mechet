import { BlogComment } from './blog-comment';

export interface IBlogCommentRepository {
  insert(blogComment: BlogComment): Promise<BlogComment>;
  update(id: string, blogComment: BlogComment): Promise<BlogComment>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<BlogComment[]>;
  getById(id: string, withDeleted: boolean): Promise<BlogComment>;
}
