import { Event } from '@event/domains/event/event';
import { EventCategory } from '@event/domains/event/event-category';
import { IEventRepository } from '@event/domains/event/event.repositort.interface';
import { EventEntity } from '@event/persistence/event/event.entity';
import { EventReview } from '@interaction/domains/event-reviews/event-review';
import { Favorite } from '@interaction/domains/favorites/favorite';
import { Interest } from '@interaction/domains/interests/interest';
import { EventReviewEntity } from '@interaction/persistence/event-reviews/event-review.entity';
import { FavoriteEntity } from '@interaction/persistence/favorites/favorite.entity';
import { InterestEntity } from '@interaction/persistence/interests/interest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategoryEntity } from './event-category.entity';

export class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
  ) {}
  async insert(event: Event): Promise<Event> {
    const eventEntity = this.toEventEntity(event);
    const result = await this.eventRepository.save(eventEntity);
    return result ? this.toEvent(result) : null;
  }
  async update(id: string, event: Event): Promise<Event> {
    const eventEntity = this.toEventEntity(event);
    const result = await this.eventRepository.save(eventEntity);
    return result ? this.toEvent(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.eventRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted = false): Promise<Event[]> {
    const events = await this.eventRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!events.length) {
      return null;
    }
    return events.map((event) => this.toEvent(event));
  }
  async getById(id: string, withDeleted = false): Promise<Event> {
    const event = await this.eventRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!event[0]) {
      return null;
    }
    return this.toEvent(event[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.eventRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.eventRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }
  toEvent(eventEntity: EventEntity): Event {
    const event: Event = new Event();
    event.id = eventEntity.id;
    event.partnerId = eventEntity.partnerId;
    event.branchId = eventEntity.branchId;
    event.title = eventEntity.title;
    event.description = eventEntity.description;
    event.views = eventEntity.views;
    event.coverImage = eventEntity.coverImage;
    event.isPublished = eventEntity.isPublished;
    event.publishedDate = eventEntity.publishedDate;
    event.from = eventEntity.from;
    event.to = eventEntity.to;
    event.averageRate = eventEntity.averageRate;
    event.address = eventEntity.address;
    event.location = eventEntity.location;
    event.tags = eventEntity.tags;
    event.eventReviews = event.eventReviews
      ? eventEntity.eventReviews.map((element) => this.toEventReview(element))
      : [];
    event.interests = eventEntity.interests
      ? eventEntity.interests.map((element) => this.toInterest(element))
      : [];
    event.eventCategories = eventEntity.eventCategories
      ? eventEntity.eventCategories.map((element) =>
          this.toEventCategory(element),
        )
      : [];
    event.favorites = eventEntity.favorites
      ? eventEntity.favorites.map((element) => this.toFavorite(element))
      : [];
    event.createdBy = eventEntity.createdBy;
    event.updatedBy = eventEntity.updatedBy;
    event.deletedBy = eventEntity.deletedBy;
    event.createdAt = eventEntity.createdAt;
    event.updatedAt = eventEntity.updatedAt;
    event.deletedAt = eventEntity.deletedAt;

    return event;
  }
  toEventEntity(event: Event): EventEntity {
    const eventEntity: EventEntity = new EventEntity();
    eventEntity.id = event.id;
    eventEntity.partnerId = event.partnerId;
    eventEntity.branchId = event.branchId;
    eventEntity.title = event.title;
    eventEntity.description = event.description;
    eventEntity.views = event.views;
    eventEntity.coverImage = event.coverImage;
    eventEntity.isPublished = event.isPublished;
    eventEntity.publishedDate = event.publishedDate;
    eventEntity.from = event.from;
    eventEntity.to = event.to;
    eventEntity.averageRate = event.averageRate;
    eventEntity.address = event.address;
    eventEntity.location = event.location;
    eventEntity.tags = event.tags;
    eventEntity.eventReviews = event.eventReviews
      ? event.eventReviews.map((element) => this.toEventReviewEntity(element))
      : [];
    eventEntity.interests = event.interests
      ? event.interests.map((element) => this.toInterestEntity(element))
      : [];
    eventEntity.eventCategories = event.eventCategories
      ? event.eventCategories.map((element) =>
          this.toEventCategoryEntity(element),
        )
      : [];
    eventEntity.favorites = event.favorites
      ? event.favorites.map((element) => this.toFavoriteEntity(element))
      : [];

    eventEntity.createdBy = event.createdBy;
    eventEntity.updatedBy = event.updatedBy;
    eventEntity.deletedBy = event.deletedBy;
    eventEntity.createdAt = event.createdAt;
    eventEntity.updatedAt = event.updatedAt;
    eventEntity.deletedAt = event.deletedAt;

    return eventEntity;
  }
  toEventCategory(eventCategoryEntity: EventCategoryEntity): EventCategory {
    const eventCategory: EventCategory = new EventCategory();
    eventCategory.id = eventCategoryEntity.id;
    eventCategory.eventId = eventCategoryEntity.eventId;
    eventCategory.categoryId = eventCategoryEntity.categoryId;
    return eventCategory;
  }
  toEventCategoryEntity(eventCategory: EventCategory): EventCategoryEntity {
    const eventCategoryEntity: EventCategoryEntity = new EventCategoryEntity();
    eventCategoryEntity.id = eventCategory.id;
    eventCategoryEntity.eventId = eventCategory.eventId;
    eventCategoryEntity.categoryId = eventCategory.categoryId;
    return eventCategoryEntity;
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
}
