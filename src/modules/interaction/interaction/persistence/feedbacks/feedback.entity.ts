import { CommonEntity } from '@libs/common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('feedbacks')
export class FeedbackEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ name: 'phone_number' })
  phoneNumber: string;
  @Column({ nullable: true })
  email: string;
  @Column()
  subject: string;
  @Column({ type: 'text' })
  description: string;
}
