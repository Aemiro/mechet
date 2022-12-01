import { FileDto } from '@libs/common/file-dto';
import { Address } from '@libs/common/address';
import { CommonEntity } from '@libs/common/common.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { EventCommentEntity } from '@event/persistence/event/event-comment.entity';
import { BlogCommentEntity } from '@blog/persistence/blog/blog-comment.entity';
import { FavoriteEntity } from '@interaction/persistence/user-interaction/favorite.entity';
import { FollowEntity } from '@interaction/persistence/user-interaction/follow.entity';
import { InterestEntity } from '@interaction/persistence/user-interaction/interest.entity';
import { PartnerReviewEntity } from '@interaction/persistence/user-interaction/partner-review.entity';
import { ReviewEntity } from '@interaction/persistence/reviews/review.entity';
@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;
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

  @OneToMany(() => PartnerReviewEntity, (partnerReview) => partnerReview.user, {
    cascade: true,
  })
  partnerReviews: PartnerReviewEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user, {
    cascade: true,
  })
  reviews: ReviewEntity[];
}
