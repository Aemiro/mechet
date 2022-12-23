import { FileDto } from '@libs/common/file-dto';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScheduleEntity } from './schedule.entity';
import { ReviewEntity } from '@interaction/persistence/reviews/review.entity';
import { PartnerCategoryEntity } from './partner-category.entity';
import { FollowEntity } from '@interaction/persistence/user-interaction/follows/follow.entity';
import { UserEntity } from '@user/persistence/users/user.entity';
import { CommonEntity } from '@libs/common/common.entity';
import { EventEntity } from '@event/persistence/event/event.entity';
import { BranchEntity } from './branch.entity';
import { ContactPerson } from '@libs/common/contact-person';
import { Status } from '@libs/common/enums';

@Entity({ name: 'partners' })
export class PartnerEntity extends CommonEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'category_id', nullable: true })
  categoryId: string;
  @Column()
  name: string;
  @Index()
  @Column({ nullable: true })
  email: string;
  @Index()
  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;
  @Column({ nullable: true })
  website: string;
  @Column({ type: 'jsonb', nullable: true })
  logo: FileDto;
  @Column({ nullable: true })
  about: string;
  @Column()
  status: Status;
  @Column({ type: 'jsonb', name: 'contact_person' })
  contactPerson: ContactPerson;

  @OneToMany(() => FollowEntity, (follow) => follow.partner, {
    cascade: true,
  })
  follows: FollowEntity[];

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

  @OneToMany(() => UserEntity, (user) => user.partner, {
    cascade: true,
  })
  users: UserEntity[];

  @OneToMany(() => EventEntity, (event) => event.partner, {
    cascade: true,
  })
  events: EventEntity[];

  @OneToMany(() => BranchEntity, (branch) => branch.partner, {
    cascade: true,
  })
  branches: BranchEntity[];
}
