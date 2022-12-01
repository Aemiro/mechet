import { Notification } from './notification';
export interface INotificationRepository {
  insert(notification: Notification): Promise<Notification>;
  update(notification: Notification): Promise<Notification>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Notification[]>;
  getById(id: string, withDeleted: boolean): Promise<Notification>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
