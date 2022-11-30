import { EventEntity } from '@event/event/persistence/event/event.entity';
import { UserEntity } from '@user/user/persistence/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'favorites' })
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;
  @Column({ type: 'uuid', name: 'event_id' })
  eventId: string;

  @ManyToOne(() => UserEntity, (user) => user.favorites, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => EventEntity, (event) => event.favorites, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
