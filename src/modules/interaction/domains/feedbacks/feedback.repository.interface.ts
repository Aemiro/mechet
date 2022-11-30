import { Feedback } from './feedback';
export interface IFeedbackRepository {
  insert(user: Feedback): Promise<Feedback>;
  update(user: Feedback): Promise<Feedback>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Feedback[]>;
  getById(id: string, withDeleted: boolean): Promise<Feedback>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
