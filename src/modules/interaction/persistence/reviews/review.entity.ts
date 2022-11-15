import { CommonEntity } from '@libs/common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('reviews')
export class ReviewEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  score: number;
  @Column({ name: 'partner_id' })
  partnerId: string;
  @Column({ nullable: true })
  description: string;
  // @ManyToOne(() => PartnerEntity, (partner) => partner.reviews, {
  //   orphanedRowAction: 'delete',
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'partner_id' })
  // partner: PartnerEntity;
}
