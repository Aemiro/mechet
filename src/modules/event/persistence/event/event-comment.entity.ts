import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'event_comment' })
export class EventCommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;
  @Column({ name: 'event_id', type: 'uuid' })
  eventId: string;
  @Column()
  description: string;
}
