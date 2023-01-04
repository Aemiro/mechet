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
import { FavoriteController } from './controllers/favorite.controller';
import { FollowController } from './controllers/follow.controller';
import { InterestController } from './controllers/interest.controller';
import { FavoriteEntity } from './persistence/user-interaction/favorites/favorite.entity';
import { FavoriteRepository } from './persistence/user-interaction/favorites/favorite.repository';
import { FollowEntity } from './persistence/user-interaction/follows/follow.entity';
import { FollowRepository } from './persistence/user-interaction/follows/follow.repository';
import { InterestEntity } from './persistence/user-interaction/interests/interest.entity';
import { InterestRepository } from './persistence/user-interaction/interests/interest.repository';
import { FavoriteCommands } from './usecases/user-interaction/favorites/favorite.usecases.commands';
import { FavoriteQueries } from './usecases/user-interaction/favorites/favorite.usecases.queries';
import { FollowCommands } from './usecases/user-interaction/follows/follow.usecases.commands';
import { FollowQueries } from './usecases/user-interaction/follows/follow.usecases.queries';
import { InterestQueries } from './usecases/user-interaction/interests/intereset.usecases.queries';
import { InterestCommands } from './usecases/user-interaction/interests/interest.usecases.commands';
@Module({
  controllers: [
    FeedbacksController,
    ReviewsController,
    BranchReviewController,
    EventReviewController,
    FavoriteController,
    FollowController,
    InterestController,
  ],
  imports: [
    TypeOrmModule.forFeature([
      FeedbackEntity,
      ReviewEntity,
      EventReviewEntity,
      BranchReviewEntity,
      FavoriteEntity,
      FollowEntity,
      InterestEntity,
    ]),
  ],
  providers: [
    FeedbackRepository,
    FeedbackCommands,
    FeedbackQuery,
    ReviewRepository,
    ReviewCommands,
    ReviewQuery,

    EventReviewRepository,
    EventReviewCommands,
    EventReviewQueries,

    BranchReviewRepository,
    BranchReviewCommands,
    BranchReviewQueries,

    FavoriteRepository,
    FavoriteCommands,
    FavoriteQueries,

    FollowRepository,
    FollowCommands,
    FollowQueries,

    InterestRepository,
    InterestCommands,
    InterestQueries,
  ],
})
export class InteractionModule {}
