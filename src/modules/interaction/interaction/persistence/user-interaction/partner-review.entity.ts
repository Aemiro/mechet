import { UserEntity } from '@user/user/persistence/user/user.entity';
import { PartnerEntity } from 'modules/partner/partner/persistence/partner/partner.entity';
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
  @Column({ type: 'uuid', name: 'partner_id' })
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
