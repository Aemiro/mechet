import { UserEntity } from '@user/persistence/users/user.entity';
import { PartnerEntity } from '@partner/persistence/partner/partner.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'follows' })
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;
  @Column({ type: 'uuid', name: 'partner_id' })
  partnerId: string;

  @ManyToOne(() => UserEntity, (user) => user.follows, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PartnerEntity, (partner) => partner.follows, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id' })
  partner: PartnerEntity;
}
