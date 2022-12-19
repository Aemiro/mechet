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
import { EventReviewEntity } from './persistence/user-interaction/event-reviews/event-review.entity';
import { EventReviewRepository } from './persistence/user-interaction/event-reviews/event-review.repository';
import { BranchReviewEntity } from './persistence/user-interaction/branch-reviews/branch-review.entity';
import { BranchReviewController } from './controllers/branch-review.controller';
import { EventReviewController } from './controllers/event-review.controller';
import { BranchReviewRepository } from './persistence/user-interaction/branch-reviews/branch-review.repository';
import { BranchReviewCommands } from './usecases/user-interaction/branch-reviews/branch-review.usecase.commands';
import { BranchReviewQueries } from './usecases/user-interaction/branch-reviews/branch-review.usecase.queries';
import { EventReviewCommands } from './usecases/user-interaction/event-reviews/event-review.usecase.commands';
import { EventReviewQueries } from './usecases/user-interaction/event-reviews/event-review.usecase.queries';
import { UserRepository } from '@user/persistence/users/user.repository';
@Module({
  controllers: [
    FeedbacksController,
    ReviewsController,
    BranchReviewController,
    EventReviewController,
  ],
  imports: [
    TypeOrmModule.forFeature([
      FeedbackEntity,
      ReviewEntity,
      EventReviewEntity,
      BranchReviewEntity,
    ]),
  ],
  providers: [
    FeedbackRepository,
    FeedbackCommands,
    FeedbackQuery,
    ReviewRepository,
    ReviewCommands,
    ReviewQuery,
    //UserRepository,
    EventReviewRepository,
    EventReviewCommands,
    EventReviewQueries,
    BranchReviewRepository,
    BranchReviewCommands,
    BranchReviewQueries,
  ],
})
export class InteractionModule {}
