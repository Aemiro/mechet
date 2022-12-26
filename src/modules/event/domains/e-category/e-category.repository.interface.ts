import { ECategory } from './e-category';

export interface IECategoryRepository {
  insert(category: ECategory): Promise<ECategory>;
  update(id: string, category: ECategory): Promise<ECategory>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<ECategory[]>;
  getById(id: string, withDeleted: boolean): Promise<ECategory>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
