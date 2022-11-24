import { CommonEntity } from '@libs/common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
export class NotificationEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column({ type: 'text' })
  body: string;
  @Column()
  to: string;
}
