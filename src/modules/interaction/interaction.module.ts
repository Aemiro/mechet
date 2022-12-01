import { ReviewCommands } from './usecases/reviews/review.usecase.commands';
import { FeedbackQuery } from './usecases/feedbacks/feedback.usecase.queries';
import { FeedbackCommands } from './usecases/feedbacks/feedback.usecase.commands';
import { FeedbackRepository } from './persistence/feedbacks/feedback.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FeedbackEntity } from './persistence/feedbacks/feedback.entity';
import { FeedbacksController } from './controllers/feedback.controller';
import { ReviewEntity } from './persistence/reviews/review.entity';
import { ReviewRepository } from './persistence/reviews/review.repository';
import { ReviewQuery } from './usecases/reviews/review.usecase.queries';
import { ReviewsController } from './controllers/review.controller';
@Module({
  controllers: [FeedbacksController, ReviewsController],
  imports: [TypeOrmModule.forFeature([FeedbackEntity, ReviewEntity])],
  providers: [
    FeedbackRepository,
    FeedbackCommands,
    FeedbackQuery,
    ReviewRepository,
    ReviewCommands,
    ReviewQuery,
  ],
})
export class InteractionModule {}
