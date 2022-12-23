import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PartnerEntity } from './partner.entity';

@Entity({ name: 'schedules' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'partner_id' })
  partnerId: string;
  @Column()
  daysOfWeek: string;
  @Column()
  from: Date;
  @Column()
  to: Date;
  @Column()
  description: string;

  @ManyToOne(() => PartnerEntity, (partner) => partner.schedules, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id' })
  partner: PartnerEntity;
}
