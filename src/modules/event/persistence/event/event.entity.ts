import { FavoriteEntity } from '@interaction/persistence/user-interaction/favorites/favorite.entity';
import { InterestEntity } from '@interaction/persistence/user-interaction/interests/interest.entity';
import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { Location } from '@libs/common/location';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventCommentEntity } from './event-comment.entity';
import { PartnerEntity } from '@partner/persistence/partner/partner.entity';
import { BranchEntity } from '@partner/persistence/partner/branch.entity';
import { EventReviewEntity } from '@interaction/persistence/user-interaction/event-reviews/event-review.entity';
import { CommonEntity } from '@libs/common/common.entity';
import { EventCategoryEntity } from './event-category.entity';
import { Address } from '@libs/common/address';

@Entity({ name: 'events' })
export class EventEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'partner_id', nullable: true })
  partnerId: string;
  @Column({ name: 'branch_id', nullable: true })
  branchId: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  views: number;
  @Column({ name: 'cover_image', type: 'jsonb', nullable: true })
  coverImage: FileDto;
  @Column({ name: 'is_published', nullable: true })
  isPublished: boolean;
  @Column({ name: 'published_date' })
  publishedDate: Date;
  @Column()
  from: Date;
  @Column({ nullable: true })
  to: Date;
  @Column({ name: 'average_rate', type: 'jsonb', nullable: true })
  averageRate: AverageRate;
  @Column({ type: 'jsonb', nullable: true })
  address: Address;
  @Column({ type: 'jsonb', nullable: true })
  location: Location;
  @Column({ name: 'num_of_interested_user', nullable: true })
  numOfInterestedUser: number;
  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @OneToMany(() => EventCommentEntity, (eventComment) => eventComment.event, {
    cascade: true,
  })
  eventComments: EventCommentEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.event, {
    cascade: true,
  })
  favorites: FavoriteEntity[];

  @OneToMany(() => InterestEntity, (interest) => interest.event, {
    cascade: true,
  })
  interests: InterestEntity[];

  @OneToMany(() => EventReviewEntity, (eventReview) => eventReview.event, {
    cascade: true,
  })
  eventReviews: EventReviewEntity[];

  @OneToMany(
    () => EventCategoryEntity,
    (eventCategory) => eventCategory.event,
    {
      cascade: true,
    },
  )
  eventCategories: EventCategoryEntity[];

  @ManyToOne(() => PartnerEntity, (partner) => partner.events, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id' })
  partner: PartnerEntity;

  @ManyToOne(() => BranchEntity, (branch) => branch.events, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity[];
}
