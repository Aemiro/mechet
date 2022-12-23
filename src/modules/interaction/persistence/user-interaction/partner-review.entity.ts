import { PartnerEntity } from '@partner/persistence/partner/partner.entity';
import { UserEntity } from '@user/persistence/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'partner_reviews' })
export class PartnerReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'partner_id', nullable: true  })
  partnerId: string;
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;
  @Column()
  description: string;
  @Column()
  rate: number;

  @ManyToOne(() => UserEntity, (user) => user.partnerReviews, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PartnerEntity, (partner) => partner.partnerReviews, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id' })
  partner: PartnerEntity;
}
