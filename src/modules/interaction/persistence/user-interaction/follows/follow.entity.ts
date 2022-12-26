import { UserEntity } from '@user/persistence/users/user.entity';
import { PartnerEntity } from '@partner/persistence/partner/partner.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CommonEntity } from '@libs/common/common.entity';
import { BranchEntity } from '@partner/persistence/partner/branch.entity';

@Entity({ name: 'follows' })
export class FollowEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'user_id', nullable: true })
  userId: string;
  @Column({ type: 'uuid', name: 'branch_id', nullable: true })
  branchId: string;

  //totalFollowers: number;
  @ManyToOne(() => UserEntity, (user) => user.follows, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => BranchEntity, (branch) => branch.follows, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;
}
