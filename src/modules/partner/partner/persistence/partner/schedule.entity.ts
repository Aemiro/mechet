import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
