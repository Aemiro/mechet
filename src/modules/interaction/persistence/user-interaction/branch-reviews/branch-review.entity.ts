import { CommonEntity } from '@libs/common/common.entity';
import { BranchEntity } from '@partner/persistence/partner/branch.entity';
import { UserEntity } from '@user/persistence/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'branch_reviews' })
export class BranchReviewEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'branch_id', nullable: true })
  branchId: string;
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;
  @Column()
  description: string;
  @Column()
  rate: number;

  @ManyToOne(() => UserEntity, (user) => user.branchReviews, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => BranchEntity, (branch) => branch.branchReviews, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;
}
