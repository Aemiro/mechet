import { Event } from '@event/event/domains/event/event';
import { IEventRepository } from '@event/event/domains/event/event.repositort.interface';

export class EventRepository implements IEventRepository {
  insert(event: Event): Promise<Event> {
    throw new Error('Method not implemented.');
  }
  update(event: Event): Promise<Event> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getAll(withDeleted: boolean): Promise<Event[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: string, withDeleted: boolean): Promise<Event> {
    throw new Error('Method not implemented.');
  }
  archive(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
