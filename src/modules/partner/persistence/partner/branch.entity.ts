import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from '@libs/common/location';
import { Address } from '@libs/common/address';
import { FileDto } from '@libs/common/file-dto';
import { AverageRate } from '@libs/common/average-rate';
import { CommonEntity } from '@libs/common/common.entity';
import { PartnerEntity } from './partner.entity';
import { EventEntity } from '@event/persistence/event/event.entity';
import { UserEntity } from '@user/persistence/users/user.entity';
import { BranchReviewEntity } from '@interaction/persistence/user-interaction/branch-reviews/branch-review.entity';
import { BlogEntity } from '@blog/persistence/blog/blog.entty';
import { ContactPerson } from '@libs/common/contact-person';

@Entity({ name: 'branches' })
export class BranchEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'partner_id', nullable: true })
  partnerId: string;
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
  @Column({ nullable: true })
  about: string;
  @Column({ type: 'jsonb', nullable: true })
  address: Address;
  @Column({ type: 'jsonb', nullable: true })
  location: Location;
  @Column({ name: 'is-main_branch', nullable: true })
  isMainBranch: boolean;
  @Column({ type: 'jsonb', name: 'contact_person' })
  contactPerson: ContactPerson;
  @Column({ type: 'jsonb', nullable: true, name: 'average_rate' })
  averageRate: AverageRate;

  @ManyToOne(() => PartnerEntity, (partner) => partner.branches, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id' })
  partner: PartnerEntity;

  @OneToMany(() => EventEntity, (event) => event.branch, {
    cascade: true,
  })
  events: EventEntity[];

  @OneToMany(() => UserEntity, (user) => user.branch, {
    cascade: true,
  })
  users: UserEntity[];

  @OneToMany(() => BranchReviewEntity, (branchReview) => branchReview.branch, {
    cascade: true,
  })
  branchReviews: BranchReviewEntity[];

  @OneToMany(() => BlogEntity, (blog) => blog.branch, {
    cascade: true,
  })
  blogs: BlogEntity[];
}
