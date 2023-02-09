import { Interest } from './interest';

export interface IInterest {
  insert(interest: Interest): Promise<Interest>;
  update(id: string, interest: Interest): Promise<Interest>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Interest[]>;
  getById(id: string, withDeleted: boolean): Promise<Interest>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
