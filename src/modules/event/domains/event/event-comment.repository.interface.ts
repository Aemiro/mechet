import { EventComment } from './event-comment';

export interface IEventCommentRepository {
  insert(eventComment: EventComment): Promise<EventComment>;
  update(id: string, eventComment: EventComment): Promise<EventComment>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<EventComment[]>;
  getById(id: string, withDeleted: boolean): Promise<EventComment>;
}
