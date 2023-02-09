import { FeedbackQuery } from './usecases/feedbacks/feedback.usecase.queries';
import { FeedbackCommands } from './usecases/feedbacks/feedback.usecase.commands';
import { FeedbackRepository } from './persistence/feedbacks/feedback.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FeedbackEntity } from './persistence/feedbacks/feedback.entity';
import { FeedbacksController } from './controllers/feedback.controller';
import { BranchReviewEntity } from './persistence/branch-reviews/branch-review.entity';
import { BranchReviewController } from './controllers/branch-review.controller';
import { EventReviewController } from './controllers/event-review.controller';
import { BranchReviewRepository } from './persistence/branch-reviews/branch-review.repository';
import { BranchReviewCommands } from './usecases/branch-reviews/branch-review.usecase.commands';
import { BranchReviewQueries } from './usecases/branch-reviews/branch-review.usecase.queries';
import { EventReviewCommands } from './usecases/event-reviews/event-review.usecase.commands';
import { EventReviewQueries } from './usecases/event-reviews/event-review.usecase.queries';
import { FavoriteController } from './controllers/favorite.controller';
import { FollowController } from './controllers/follow.controller';
import { InterestController } from './controllers/interest.controller';
import { FavoriteCommands } from './usecases/favorites/favorite.usecases.commands';
import { FavoriteQueries } from './usecases/favorites/favorite.usecases.queries';
import { FollowCommands } from './usecases/follows/follow.usecases.commands';
import { FollowQueries } from './usecases/follows/follow.usecases.queries';
import { InterestQueries } from './usecases/interests/intereset.usecases.queries';
import { InterestCommands } from './usecases/interests/interest.usecases.commands';
import { EventReviewEntity } from './persistence/event-reviews/event-review.entity';
import { EventReviewRepository } from './persistence/event-reviews/event-review.repository';
import { FavoriteEntity } from './persistence/favorites/favorite.entity';
import { FavoriteRepository } from './persistence/favorites/favorite.repository';
import { FollowEntity } from './persistence/follows/follow.entity';
import { FollowRepository } from './persistence/follows/follow.repository';
import { InterestEntity } from './persistence/interests/interest.entity';
import { InterestRepository } from './persistence/interests/interest.repository';
@Module({
  controllers: [
    FeedbacksController,
    BranchReviewController,
    EventReviewController,
    FavoriteController,
    FollowController,
    InterestController,
  ],
  imports: [
    TypeOrmModule.forFeature([
      FeedbackEntity,
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
