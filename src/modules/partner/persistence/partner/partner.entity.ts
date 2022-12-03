import { FollowEntity } from '@interaction/persistence/user-interaction/follow.entity';
import { PartnerReviewEntity } from '@interaction/persistence/user-interaction/partner-review.entity';
import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ScheduleEntity } from './schedule.entity';
import { Location } from '@libs/common/location';
import { ReviewEntity } from '@interaction/persistence/reviews/review.entity';
import { Address } from '@libs/common/address';
import { PartnerCategoryEntity } from './partner-category.entity';

@Entity({ name: 'partners' })
export class PartnerEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Index()
  @Column({ nullable: true })
  email: string;
  @Column()
  password: string;
  @Index()
  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;
  @Column({ name: 'cover_image', type: 'jsonb', nullable: true })
  coverImage: FileDto;
  @Column()
  website: string;
  @Column({ type: 'jsonb', nullable: true })
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
  @Column({ nullable: true, name: 'created_by' })
  createdBy: string;
  @Column({ nullable: true, name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: 'now()',
    name: 'created_at',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamptz',
    default: 'now()',
    name: 'updated_at',
  })
  updatedAt: Date;
  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  deletedAt: Date;
  @Column({ nullable: true, name: 'deleted_by' })
  deletedBy: string;

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

  @OneToMany(() => ReviewEntity, (review) => review.partner, {
    cascade: true,
  })
  reviews: ReviewEntity[];
  @OneToMany(
    () => PartnerCategoryEntity,
    (partnerCategory) => partnerCategory.partner,
    {
      cascade: true,
    },
  )
  partnerCategories: PartnerCategoryEntity[];
}
