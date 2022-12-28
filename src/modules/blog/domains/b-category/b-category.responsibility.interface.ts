import { BCategory } from './b-category';

export interface IBCategoryRepository {
  insert(category: BCategory): Promise<BCategory>;
  update(id: string, category: BCategory): Promise<BCategory>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<BCategory[]>;
  getById(id: string, withDeleted: boolean): Promise<BCategory>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
