import { Follow } from './follow';

export interface IFollow {
  insert(follow: Follow): Promise<Follow>;
  update(id: string, follow: Follow): Promise<Follow>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Follow[]>;
  getById(id: string, withDeleted: boolean): Promise<Follow>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
