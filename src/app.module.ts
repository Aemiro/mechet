import { FollowEntity } from '@interaction/persistence/user-interaction/follow.entity';
import { FavoriteEntity } from './modules/interaction/persistence/user-interaction/favorite.entity';
import { ScheduleEntity } from './modules/partner/persistence/partner/schedule.entity';
import { CategoryEntity } from './modules/partner/persistence/partner/category.entity';
import { BlogCommentEntity } from '@blog/persistence/blog/blog-comment.entity';
import { BlogCategoryEntity } from './modules/blog/persistence/blog/blog-category.entity';
import { EventCategoryEntity } from './modules/event/persistence/event/event-category.entity';
import { BlogEntity } from './modules/blog/persistence/blog/blog.entty';
import { EventEntity } from '@event/persistence/event/event.entity';
import { PartnerEntity } from './modules/partner/persistence/partner/partner.entity';
import { EventCommentEntity } from '@event/persistence/event/event-comment.entity';
import { AppController } from './app.controller';
import { NotificationModule } from '@notification/notification.module';
import { BlogModule } from '@blog/blog.module';
import { InteractionModule } from '@interaction/interaction.module';
import { UserModule } from '@user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackEntity } from '@interaction/persistence/feedbacks/feedback.entity';
import { ReviewEntity } from '@interaction/persistence/reviews/review.entity';
import * as dotenv from 'dotenv';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {
  FileManagerModule,
  FileManagerService,
} from '@libs/common/file-manager';
import { UserEntity } from '@user/persistence/users/user.entity';
import { NotificationEntity } from '@notification/persistence/notification/notification.entity';
import { InterestEntity } from '@interaction/persistence/user-interaction/interest.entity';
import { EventReviewEntity } from '@interaction/persistence/user-interaction/event-review.entity';
import { PartnerReviewEntity } from '@interaction/persistence/user-interaction/partner-review.entity';
dotenv.config({ path: '.env' });
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://luesqung:7dNP_FqGw-1UAyi2OUJ11hB15CaFOByv@rosie.db.elephantsql.com/luesqung',
      entities: [
        UserEntity,
        FeedbackEntity,
        NotificationEntity,
        ReviewEntity,
        EventReviewEntity,
        EventCommentEntity,
        PartnerEntity,
        EventEntity,
        BlogEntity,
        EventCategoryEntity,
        BlogCategoryEntity,
        BlogCommentEntity,
        CategoryEntity,
        ScheduleEntity,
        FavoriteEntity,
        FollowEntity,
        InterestEntity,
        PartnerReviewEntity,
      ],
      synchronize: true,
    }),
    UserModule,
    InteractionModule,
    BlogModule,
    NotificationModule,
    FileManagerModule,
  ],
  controllers: [AppController],
  providers: [FileManagerService],
})
export class AppModule {}
