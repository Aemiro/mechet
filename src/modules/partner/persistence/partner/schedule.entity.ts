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
  @Column({ type: 'uuid', name: 'branch_id' })
  branchId: string;
  @Column({ name: 'days_of_week ' })
  daysOfWeek: string;
  @Column({ name: 'starting_time' })
  startingTime: Date;
  @Column({ name: 'end_time' })
  endTime: Date;
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
