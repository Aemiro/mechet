import { CommonEntity } from '@libs/common/common.entity';
import { UserEntity } from '@user/persistence/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('reviews')
export class ReviewEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  score: number;
  @Column({ name: 'partner_id' })
  partnerId: string;
  @Column({ name: 'user_id' })
  userId: string;
  @Column({ nullable: true })
  description: string;
  @ManyToOne(() => UserEntity, (user) => user.reviews, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
