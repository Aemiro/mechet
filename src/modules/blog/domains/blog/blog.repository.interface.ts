import { Blog } from './blog';

export interface IBlogRepository {
  insert(blog: Blog): Promise<Blog>;
  update(blog: Blog): Promise<Blog>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Blog[]>;
  getById(id: string, withDeleted: boolean): Promise<Blog>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
