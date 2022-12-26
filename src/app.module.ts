import { ScheduleEntity } from './modules/partner/persistence/partner/schedule.entity';
import { BlogEntity } from './modules/blog/persistence/blog/blog.entity';
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
import { PartnerCategoryEntity } from '@partner/persistence/partner/partner-category.entity';
import { PartnerrModule } from '@partner/partner.module';
import { BlogCommentEntity } from '@blog/persistence/blog/blog-comment.entity';
import { InterestEntity } from '@interaction/persistence/user-interaction/interests/interest.entity';
import { FavoriteEntity } from '@interaction/persistence/user-interaction/favorites/favorite.entity';
import { FollowEntity } from '@interaction/persistence/user-interaction/follows/follow.entity';
import { BranchEntity } from '@partner/persistence/partner/branch.entity';
import { EventReviewEntity } from '@interaction/persistence/user-interaction/event-reviews/event-review.entity';
import { BranchReviewEntity } from '@interaction/persistence/user-interaction/branch-reviews/branch-review.entity';
import { EventModule } from '@event/event.module';
import { EventCategoryEntity } from '@event/persistence/event/event-category.entity';
import { ECategoryEntity } from '@event/persistence/e-category/e-category.entity';
import { BCategoryEntity } from '@blog/persistence/b-category/b-category.entity';
import { PCategoryEntity } from '@partner/persistence/p-category/p-category.entity';
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

        EventEntity,
        ECategoryEntity,
        EventCategoryEntity,
        EventCommentEntity,

        BlogEntity,
        BCategoryEntity,
        BlogCommentEntity,

        FavoriteEntity,
        FollowEntity,
        InterestEntity,
        ReviewEntity,
        EventReviewEntity,
        BranchReviewEntity,

        PartnerEntity,
        PCategoryEntity,
        PartnerCategoryEntity,
        BranchEntity,
        ScheduleEntity,
      ],
      synchronize: true,
    }),
    UserModule,
    PartnerrModule,
    EventModule,
    InteractionModule,
    BlogModule,
    NotificationModule,
    FileManagerModule,
  ],
  controllers: [AppController],
  providers: [FileManagerService],
})
export class AppModule {}
