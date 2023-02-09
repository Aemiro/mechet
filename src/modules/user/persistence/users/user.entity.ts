import { FileDto } from '@libs/common/file-dto';
import { Address } from '@libs/common/address';
import { CommonEntity } from '@libs/common/common.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EventCommentEntity } from '@event/persistence/event/event-comment.entity';
import { BlogCommentEntity } from '@blog/persistence/blog/blog-comment.entity';
import { FavoriteEntity } from '@interaction/persistence/favorites/favorite.entity';
import { FollowEntity } from '@interaction/persistence/follows/follow.entity';
import { InterestEntity } from '@interaction/persistence/interests/interest.entity';
import { PartnerEntity } from '@partner/persistence/partner/partner.entity';
import { Location } from '@libs/common/location';
import { BranchEntity } from '@partner/persistence/partner/branch.entity';
import { BranchReviewEntity } from '@interaction/persistence/branch-reviews/branch-review.entity';
import { EventReviewEntity } from '@interaction/persistence/event-reviews/event-review.entity';
@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'partner_id', nullable: true })
  partnerId;
  @Column({ name: 'branch_id', nullable: true })
  branchId: string;
  @Column()
  name: string;
  @Index()
  @Column({ nullable: true })
  email: string;
  @Index()
  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;
  @Column()
  gender: string;
  @Column({ name: 'enabled', default: true })
  enabled: boolean;
  @Column({ name: 'profile_image', type: 'jsonb', nullable: true })
  profileImage: FileDto;
  @Column({ type: 'jsonb', nullable: true })
  address: Address;
  @Column({ type: 'jsonb', nullable: true })
  location: Location;
  @Column({ type: 'simple-array' })
  role: string[];
  @Column()
  password: string;

  @OneToMany(() => EventCommentEntity, (eventComment) => eventComment.user, {
    cascade: true,
  })
  eventComments: EventCommentEntity[];

  @OneToMany(() => BlogCommentEntity, (blogComment) => blogComment.user, {
    cascade: true,
  })
  blogComments: BlogCommentEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user, {
    cascade: true,
  })
  favorites: FavoriteEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.user, {
    cascade: true,
  })
  follows: FollowEntity[];

  @OneToMany(() => InterestEntity, (interest) => interest.user, {
    cascade: true,
  })
  interests: InterestEntity[];

  @OneToMany(() => BranchReviewEntity, (branchReview) => branchReview.user, {})
  branchReviews: BranchReviewEntity[];

  @OneToMany(() => EventReviewEntity, (eventReview) => eventReview.user, {
    cascade: true,
  })
  eventReviews: EventReviewEntity[];

  @ManyToOne(() => PartnerEntity, (partner) => partner.users, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id' })
  partner: PartnerEntity;

  @ManyToOne(() => BranchEntity, (branch) => branch.users, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;
}
