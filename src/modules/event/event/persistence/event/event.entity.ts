import { FavoriteEntity } from '@interaction/interaction/persistence/user-interaction/favorite.entity';
import { InterestEntity } from '@interaction/interaction/persistence/user-interaction/interest.entity';
import { ReviewEntity } from '@interaction/interaction/persistence/user-interaction/review.entity';
import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { Address } from 'nodemailer/lib/mailer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventCommentEntity } from './event-comment.entity';

@Entity({ name: 'events' })
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  views: number;
  @Column({ name: 'cover_image', type: 'jsonb', nullable: true })
  coverImage: FileDto;
  @Column({ name: 'is_published' })
  isPublished: boolean;
  @Column({ name: 'published_date' })
  publishedDate: Date;
  @Column()
  from: Date;
  @Column()
  to: Date;
  @Column({ name: 'average_rate' })
  averageRate: AverageRate;
  @Column()
  address: Address;
  @Column()
  location: Location;

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

  @OneToMany(() => ReviewEntity, (review) => review.event, {
    cascade: true,
  })
  reviews: ReviewEntity[];
}
