import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BranchEntity } from '@partner/persistence/partner/branch.entity';

@Entity({ name: 'schedules' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'branch_id',nullable: true  })
  branchId: string;
  @Column({ name: 'days_of_week ' })
  daysOfWeek: string;
  @Column({ name: 'starting_time' })
  startingTime: Date;
  @Column({ name: 'end_time' })
  endTime: Date;
  @Column()
  description: string;

  @ManyToOne(() => BranchEntity, (branch) => branch.schedules, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;
}
