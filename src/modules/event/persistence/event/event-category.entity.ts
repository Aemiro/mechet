import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EventEntity } from '@event/persistence/event/event.entity';
import { ECategoryEntity } from '../e-category/e-category.entity';

@Entity({ name: 'event-categories' })
export class EventCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'event_id' })
  eventId: string;
  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => EventEntity, (event) => event.eventCategories, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;

  @ManyToOne(() => ECategoryEntity, (eCategory) => eCategory.eventCategories, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  eCategory: ECategoryEntity;
}
