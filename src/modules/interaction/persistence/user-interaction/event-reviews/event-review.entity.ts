import { EventEntity } from '@event/persistence/event/event.entity';
import { CommonEntity } from '@libs/common/common.entity';
import { UserEntity } from '@user/persistence/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'event_reviews' })
export class EventReviewEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'user_id', nullable: true })
  userId: string;
  @Column({ type: 'uuid', name: 'event_id', nullable: true })
  eventId: string;
  @Column()
  description: string;
  @Column()
  rate: number;

  @ManyToOne(() => UserEntity, (user) => user.eventReviews, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => EventEntity, (event) => event.eventReviews, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
