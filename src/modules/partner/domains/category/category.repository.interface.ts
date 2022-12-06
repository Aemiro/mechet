import { Category } from './category';

export interface ICategory {
  insert(category: Category): Promise<Category>;
  update(id: string, category: Category): Promise<Category>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Category[]>;
  getById(id: string, withDeleted: boolean): Promise<Category>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
