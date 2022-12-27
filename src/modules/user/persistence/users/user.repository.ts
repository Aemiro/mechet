import { EventReview } from '@interaction/domains/user-interaction/event-reviews/event-review';
import { EventReviewEntity } from '@interaction/persistence/user-interaction/event-reviews/event-review.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/domains/user/user';
import { IUserRepository } from '@user/domains/user/user.repository.interface';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { BranchReviewEntity } from '@interaction/persistence/user-interaction/branch-reviews/branch-review.entity';
import { BranchReview } from '@interaction/domains/user-interaction/branch-reviews/branch-review';
import { Favorite } from '@interaction/domains/user-interaction/favorites/favorite';
import { FavoriteEntity } from '@interaction/persistence/user-interaction/favorites/favorite.entity';
import { Follow } from '@interaction/domains/user-interaction/follows/follow';
import { FollowEntity } from '@interaction/persistence/user-interaction/follows/follow.entity';
import { Interest } from '@interaction/domains/user-interaction/interests/interest';
import { InterestEntity } from '@interaction/persistence/user-interaction/interests/interest.entity';
import { BlogComment } from '@blog/domains/blog/blog-comment';
import { BlogCommentEntity } from '@blog/persistence/blog/blog-comment.entity';
import { EventComment } from '@event/domains/event/event-comment';
import { EventCommentEntity } from '@event/persistence/event/event-comment.entity';
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async insert(user: User): Promise<User> {
    const userEntity = this.toUserEntity(user);
    const result = await this.userRepository.save(userEntity);
    return result ? this.toUser(result) : null;
  }
  async update(id: string, user: User): Promise<User> {
    const userEntity = this.toUserEntity(user);
    const result = await this.userRepository.save(userEntity);
    return result ? this.toUser(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: [
        // 'favorites',
        // 'interests',
        // 'follows',
        // 'branchReviews',
        // 'event_reviews',
        // 'blog_comments',
        // 'event_comments',
      ],
      withDeleted: withDeleted,
    });
    if (!users.length) {
      return null;
    }
    return users.map((user) => this.toUser(user));
  }
  async getById(id: string, withDeleted = false): Promise<User> {
    const user = await this.userRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!user[0]) {
      return null;
    }
    return this.toUser(user[0]);
  }
  async getByPhoneNumber(
    phoneNumber: string,
    withDeleted = false,
  ): Promise<User> {
    const user = await this.userRepository.find({
      where: { phoneNumber: phoneNumber },
      relations: [
        // 'favorites',
        // 'interests',
        // 'follows',
        // 'branch_reviews',
        // 'event_reviews',
        // 'blog_comments',
        // 'event_comments',
      ],
      withDeleted: withDeleted,
    });
    if (!user[0]) {
      return null;
    }
    return this.toUser(user[0]);
  }
  async getByEmail(email: string, withDeleted = false): Promise<User> {
    const user = await this.userRepository.find({
      where: { email: email },
      relations: [
        // 'favorites',
        // 'interests',
        // 'follows',
        // 'branch_reviews',
        // 'event_reviews',
        // 'blog_comments',
        // 'event_comments',
      ],
      withDeleted: withDeleted,
    });
    if (!user[0]) {
      return null;
    }
    return this.toUser(user[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.userRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.userRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }
  toUser(userEntity: UserEntity): User {
    const user = new User();
    user.id = userEntity.id;
    user.partnerId = userEntity.partnerId;
    user.branchId = userEntity.branchId;
    user.name = userEntity.name;
    user.email = userEntity.email;
    user.phoneNumber = userEntity.phoneNumber;
    user.gender = userEntity.gender;
    user.password = userEntity.password;
    user.enabled = userEntity.enabled;
    user.profileImage = userEntity.profileImage;
    user.address = userEntity.address;
    user.location = userEntity.location;
    user.role = userEntity.role;
    user.createdBy = userEntity.createdBy;
    user.updatedBy = userEntity.updatedBy;
    user.deletedBy = userEntity.deletedBy;
    user.createdAt = userEntity.createdAt;
    user.updatedAt = userEntity.updatedAt;
    user.deletedAt = userEntity.deletedAt;
    user.eventComments = userEntity.eventComments
      ? userEntity.eventComments.map((element) => this.toEventComment(element))
      : [];
    user.blogComments = userEntity.blogComments
      ? userEntity.blogComments.map((element) => this.toBlogComment(element))
      : [];
    user.eventReviews = userEntity.eventReviews
      ? userEntity.eventReviews.map((element) => this.toEventReview(element))
      : [];
    user.branchReviews = userEntity.branchReviews
      ? userEntity.branchReviews.map((element) => this.toBranchReview(element))
      : [];
    user.interests = userEntity.interests
      ? userEntity.interests.map((element) => this.toInterest(element))
      : [];
    user.follows = userEntity.follows
      ? userEntity.follows.map((element) => this.toFollow(element))
      : [];
    user.favorites = userEntity.favorites
      ? userEntity.favorites.map((element) => this.toFavorite(element))
      : [];
    return user;
  }
  toUserEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.partnerId = user.partnerId;
    userEntity.branchId = user.branchId;
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.phoneNumber = user.phoneNumber;
    userEntity.gender = user.gender;
    userEntity.enabled = user.enabled;
    userEntity.profileImage = user.profileImage;
    userEntity.address = user.address;
    userEntity.location = user.location;
    userEntity.password = user.password;
    userEntity.role = user.role;
    userEntity.createdBy = user.createdBy;
    userEntity.updatedBy = user.updatedBy;
    userEntity.deletedBy = user.deletedBy;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    userEntity.deletedAt = user.deletedAt;
    userEntity.eventComments = user.eventComments
      ? user.eventComments.map((element) => this.toEventCommentEntity(element))
      : [];
    userEntity.blogComments = user.blogComments
      ? user.blogComments.map((element) => this.toBlogCommentEntity(element))
      : [];
    userEntity.eventReviews = user.eventReviews
      ? user.eventReviews.map((element) => this.toEventReviewEntity(element))
      : [];
    userEntity.branchReviews = user.branchReviews
      ? user.branchReviews.map((element) => this.toBranchReviewEntity(element))
      : [];
    userEntity.interests = user.interests
      ? user.interests.map((element) => this.toInterestEntity(element))
      : [];
    userEntity.follows = user.follows
      ? user.follows.map((element) => this.toFollowEntity(element))
      : [];
    userEntity.favorites = user.favorites
      ? user.favorites.map((element) => this.toFavoriteEntity(element))
      : [];

    return userEntity;
  }
  toEventReviewEntity(eventReview: EventReview): EventReviewEntity {
    const eventReviewEntity: EventReviewEntity = new EventReviewEntity();
    eventReviewEntity.id = eventReview.id;
    eventReviewEntity.userId = eventReview.userId;
    eventReviewEntity.eventId = eventReview.eventId;
    eventReviewEntity.description = eventReview.description;
    eventReviewEntity.rate = eventReview.rate;
    eventReviewEntity.createdBy = eventReview.createdBy;
    eventReviewEntity.updatedBy = eventReview.updatedBy;
    eventReviewEntity.deletedBy = eventReview.deletedBy;
    eventReviewEntity.createdAt = eventReview.createdAt;
    eventReviewEntity.updatedAt = eventReview.updatedAt;
    eventReviewEntity.deletedAt = eventReview.deletedAt;
    return eventReviewEntity;
  }

  toEventReview(eventReviewEntity: EventReviewEntity): EventReview {
    const eventReview: EventReview = new EventReview();
    eventReview.id = eventReviewEntity.id;
    eventReview.userId = eventReviewEntity.userId;
    eventReview.eventId = eventReviewEntity.eventId;
    eventReview.description = eventReviewEntity.description;
    eventReview.rate = eventReviewEntity.rate;
    eventReview.createdBy = eventReviewEntity.createdBy;
    eventReview.updatedBy = eventReviewEntity.updatedBy;
    eventReview.deletedBy = eventReviewEntity.deletedBy;
    eventReview.createdAt = eventReviewEntity.createdAt;
    eventReview.updatedAt = eventReviewEntity.updatedAt;
    eventReview.deletedAt = eventReviewEntity.deletedAt;
    return eventReview;
  }

  toBranchReviewEntity(branchReview: BranchReview): BranchReviewEntity {
    const branchReviewEntity: BranchReviewEntity = new BranchReviewEntity();
    branchReviewEntity.id = branchReview.id;
    branchReviewEntity.userId = branchReview.userId;
    branchReviewEntity.branchId = branchReview.branchId;
    branchReviewEntity.description = branchReview.description;
    branchReviewEntity.rate = branchReview.rate;
    branchReviewEntity.createdBy = branchReview.createdBy;
    branchReviewEntity.updatedBy = branchReview.updatedBy;
    branchReviewEntity.deletedBy = branchReview.deletedBy;
    branchReviewEntity.createdAt = branchReview.createdAt;
    branchReviewEntity.updatedAt = branchReview.updatedAt;
    branchReviewEntity.deletedAt = branchReview.deletedAt;
    return branchReviewEntity;
  }

  toBranchReview(branchReviewEntity: BranchReviewEntity): BranchReview {
    const branchReview: BranchReview = new BranchReview();
    branchReview.id = branchReviewEntity.id;
    branchReview.userId = branchReviewEntity.userId;
    branchReview.branchId = branchReviewEntity.branchId;
    branchReview.description = branchReviewEntity.description;
    branchReview.rate = branchReviewEntity.rate;
    branchReview.createdBy = branchReviewEntity.createdBy;
    branchReview.updatedBy = branchReviewEntity.updatedBy;
    branchReview.deletedBy = branchReviewEntity.deletedBy;
    branchReview.createdAt = branchReviewEntity.createdAt;
    branchReview.updatedAt = branchReviewEntity.updatedAt;
    branchReview.deletedAt = branchReviewEntity.deletedAt;
    return branchReview;
  }

  toFavoriteEntity(favorite: Favorite): FavoriteEntity {
    const favoriteEntity: FavoriteEntity = new FavoriteEntity();
    favoriteEntity.id = favorite.id;
    favoriteEntity.userId = favorite.userId;
    favoriteEntity.eventId = favorite.eventId;
    favoriteEntity.createdBy = favorite.createdBy;
    favoriteEntity.updatedBy = favorite.updatedBy;
    favoriteEntity.deletedBy = favorite.deletedBy;
    favoriteEntity.createdAt = favorite.createdAt;
    favoriteEntity.updatedAt = favorite.updatedAt;
    favoriteEntity.deletedAt = favorite.deletedAt;
    return favoriteEntity;
  }

  toFavorite(favoriteEntity: FavoriteEntity): Favorite {
    const favorite: Favorite = new Favorite();
    favorite.id = favoriteEntity.id;
    favorite.userId = favoriteEntity.userId;
    favorite.eventId = favoriteEntity.eventId;
    favorite.createdBy = favoriteEntity.createdBy;
    favorite.updatedBy = favoriteEntity.updatedBy;
    favorite.deletedBy = favoriteEntity.deletedBy;
    favorite.createdAt = favoriteEntity.createdAt;
    favorite.updatedAt = favoriteEntity.updatedAt;
    favorite.deletedAt = favoriteEntity.deletedAt;
    return favorite;
  }

  toFollowEntity(follow: Follow): FollowEntity {
    const followEntity: FollowEntity = new FollowEntity();
    followEntity.id = follow.id;
    followEntity.userId = follow.userId;
    followEntity.branchId = follow.branchId;
    followEntity.createdBy = follow.createdBy;
    followEntity.updatedBy = follow.updatedBy;
    followEntity.deletedBy = follow.deletedBy;
    followEntity.createdAt = follow.createdAt;
    followEntity.updatedAt = follow.updatedAt;
    followEntity.deletedAt = follow.deletedAt;
    return followEntity;
  }

  toFollow(followEntity: FollowEntity): Follow {
    const follow: Follow = new Follow();
    follow.id = followEntity.id;
    follow.userId = followEntity.userId;
    follow.branchId = followEntity.branchId;
    follow.createdBy = followEntity.createdBy;
    follow.updatedBy = followEntity.updatedBy;
    follow.deletedBy = followEntity.deletedBy;
    follow.createdAt = followEntity.createdAt;
    follow.updatedAt = followEntity.updatedAt;
    follow.deletedAt = followEntity.deletedAt;
    return follow;
  }

  toInterestEntity(interest: Interest): InterestEntity {
    const interestEntity: InterestEntity = new InterestEntity();
    interestEntity.id = interest.id;
    interestEntity.userId = interest.userId;
    interestEntity.eventId = interest.eventId;
    interestEntity.createdBy = interest.createdBy;
    interestEntity.updatedBy = interest.updatedBy;
    interestEntity.deletedBy = interest.deletedBy;
    interestEntity.createdAt = interest.createdAt;
    interestEntity.updatedAt = interest.updatedAt;
    interestEntity.deletedAt = interest.deletedAt;
    return interestEntity;
  }

  toInterest(interestEntity: InterestEntity): Interest {
    const interest: Interest = new Interest();
    interest.id = interestEntity.id;
    interest.userId = interestEntity.userId;
    interest.eventId = interestEntity.eventId;
    interest.createdBy = interestEntity.createdBy;
    interest.updatedBy = interestEntity.updatedBy;
    interest.deletedBy = interestEntity.deletedBy;
    interest.createdAt = interestEntity.createdAt;
    interest.updatedAt = interestEntity.updatedAt;
    interest.deletedAt = interestEntity.deletedAt;
    return interest;
  }

  toBlogComment(blogCommentEntity: BlogCommentEntity): BlogComment {
    const blogComment: BlogComment = new BlogComment();
    blogComment.id = blogCommentEntity.id;
    blogComment.blogId = blogCommentEntity.blogId;
    blogComment.userId = blogCommentEntity.userId;
    blogComment.description = blogCommentEntity.description;
    return blogComment;
  }
  toBlogCommentEntity(blogComment: BlogComment): BlogCommentEntity {
    const blogCommentEntity: BlogCommentEntity = new BlogCommentEntity();
    blogCommentEntity.id = blogComment.id;
    blogCommentEntity.blogId = blogComment.blogId;
    blogCommentEntity.userId = blogComment.userId;
    blogCommentEntity.description = blogComment.description;
    return blogCommentEntity;
  }

  toEventComment(eventCommentEntity: EventCommentEntity): EventComment {
    const eventComment: EventComment = new EventComment();
    eventComment.id = eventCommentEntity.id;
    eventComment.eventId = eventCommentEntity.eventId;
    eventComment.userId = eventCommentEntity.userId;
    eventComment.description = eventCommentEntity.description;
    return eventComment;
  }
  toEventCommentEntity(eventComment: EventComment): EventCommentEntity {
    const eventCommentEntity: EventCommentEntity = new EventCommentEntity();
    eventCommentEntity.id = eventComment.id;
    eventCommentEntity.eventId = eventComment.eventId;
    eventCommentEntity.userId = eventComment.userId;
    eventCommentEntity.description = eventComment.description;
    return eventCommentEntity;
  }
}
