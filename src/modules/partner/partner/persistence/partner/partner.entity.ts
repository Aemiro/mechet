import { FollowEntity } from '@interaction/interaction/persistence/user-interaction/follow.entity';
import { PartnerReviewEntity } from '@interaction/interaction/persistence/user-interaction/partner-review.entity';
import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { Address } from 'nodemailer/lib/mailer';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScheduleEntity } from './schedule.entity';
import { Location } from '@libs/common/location';

@Entity({ name: 'partners' })
export class PartnerEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;
  @Column()
  name: string;
  @Index()
  @Column({ nullable: true })
  email: string;
  @Index()
  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;
  @Column({ name: 'cover_image', type: 'jsonb', nullable: true })
  coverImage: FileDto;
  @Column()
  website: string;
  @Column()
  logo: FileDto;
  @Column()
  about: string;
  @Column({ name: 'registration_date' })
  registrationDate: Date;
  @Column()
  status: string;
  @Column({ type: 'jsonb', nullable: true })
  address: Address;
  @Column({ type: 'jsonb', nullable: true })
  location: Location;
  @Column({ type: 'jsonb', nullable: true, name: 'average_rate' })
  averageRate: AverageRate;

  @OneToMany(() => FollowEntity, (follow) => follow.partner, {
    cascade: true,
  })
  follows: FollowEntity[];

  @OneToMany(
    () => PartnerReviewEntity,
    (partnerReview) => partnerReview.partner,
    {
      cascade: true,
    },
  )
  partnerReviews: PartnerReviewEntity[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.partner, {
    cascade: true,
  })
  schedules: ScheduleEntity[];
}
