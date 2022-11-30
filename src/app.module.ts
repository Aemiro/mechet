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
dotenv.config({ path: '.env' });
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://luesqung:7dNP_FqGw-1UAyi2OUJ11hB15CaFOByv@rosie.db.elephantsql.com/luesqung',
      entities: [UserEntity, FeedbackEntity, NotificationEntity, ReviewEntity],
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
