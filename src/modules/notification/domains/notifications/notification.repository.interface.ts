import { Notification } from './notification';
export interface INotificationRepository {
  insert(user: Notification): Promise<Notification>;
  update(user: Notification): Promise<Notification>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Notification[]>;
  getById(id: string, withDeleted: boolean): Promise<Notification>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
