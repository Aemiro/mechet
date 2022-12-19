import { EventReview } from './event-review';

export interface IEventReview {
  insert(eventReview: EventReview): Promise<EventReview>;
  update(id: string, eventReview: EventReview): Promise<EventReview>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<EventReview[]>;
  getById(id: string, withDeleted: boolean): Promise<EventReview>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
