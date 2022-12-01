import { Event } from './event';
export interface IEventRepository {
  insert(event: Event): Promise<Event>;
  update(event: Event): Promise<Event>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Event[]>;
  getById(id: string, withDeleted: boolean): Promise<Event>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
