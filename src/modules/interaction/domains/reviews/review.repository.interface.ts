import { Review } from './review';
export interface IReviewRepository {
  insert(user: Review): Promise<Review>;
  update(user: Review): Promise<Review>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Review[]>;
  getById(id: string, withDeleted: boolean): Promise<Review>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
