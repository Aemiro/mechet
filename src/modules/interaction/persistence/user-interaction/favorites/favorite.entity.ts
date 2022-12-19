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

@Entity({ name: 'favorites' })
export class FavoriteEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;
  @Column({ type: 'uuid', name: 'event_id', nullable: true })
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
