import { PCategory } from './p-category';

export interface IPCategory {
  insert(category: PCategory): Promise<PCategory>;
  update(id: string, category: PCategory): Promise<PCategory>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<PCategory[]>;
  getById(id: string, withDeleted: boolean): Promise<PCategory>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
