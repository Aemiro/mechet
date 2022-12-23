import { Favorite } from './favorite';

export interface IFavorite {
  insert(favorite: Favorite): Promise<Favorite>;
  update(id: string, favorite: Favorite): Promise<Favorite>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Favorite[]>;
  getById(id: string, withDeleted: boolean): Promise<Favorite>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
