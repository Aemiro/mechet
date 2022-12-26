import { EventReview } from '@interaction/domains/user-interaction/event-reviews/event-review';
import { Favorite } from '@interaction/domains/user-interaction/favorites/favorite';
import { Interest } from '@interaction/domains/user-interaction/interests/interest';
import { Address } from '@libs/common/address';
import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { Location } from '@libs/common/location';
import { EventCategory } from './event-category';
import { EventComment } from './event-comment';
export class Event {
  id: string;
  partnerId: string;
  branchId: string;
  title: string;
  description: string;
  views: number;
  coverImage: FileDto;
  isPublished: boolean;
  publishedDate: Date;
  from: Date;
  to: Date;
  averageRate: AverageRate;
  address: Address;
  location: Location;
  // numOfInterestedUser: number;
  tags: string[];
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
  eventComments: EventComment[];
  eventReviews: EventReview[];
  interests: Interest[];
  favorites: Favorite[];
  eventCategories: EventCategory[];

  //EventComment
  async addEventComment(createEventComment: EventComment) {
    this.eventComments.push(createEventComment);
  }

  async updateEventComment(eventComment: EventComment) {
    const existIndex = this.eventComments.findIndex(
      (element) => element.id == eventComment.id,
    );
    this.eventComments[existIndex] = eventComment;
  }

  async removeEventComment(id: string) {
    this.eventComments = this.eventComments.filter(
      (element) => element.id != id,
    );
  }

  async updateEventComments(eventComments: EventComment[]) {
    this.eventComments = eventComments;
  }
  //EventReview
  async addEventReview(createEventReview: EventReview) {
    this.eventReviews.push(createEventReview);
  }

  async updateEventReview(eventReview: EventReview) {
    const existIndex = this.eventReviews.findIndex(
      (element) => element.id == eventReview.id,
    );
    this.eventReviews[existIndex] = eventReview;
  }

  async removeEventReview(id: string) {
    this.eventReviews = this.eventReviews.filter((element) => element.id != id);
  }

  async updateEventReviews(eventReviews: EventReview[]) {
    this.eventReviews = eventReviews;
  }

  //Interest
  async addInterest(createInterest: Interest) {
    this.interests.push(createInterest);
  }

  async updateInterest(interest: Interest) {
    const existIndex = this.interests.findIndex(
      (element) => element.id == interest.id,
    );
    this.interests[existIndex] = interest;
  }

  async removeInterest(id: string) {
    this.interests = this.interests.filter((element) => element.id != id);
  }

  async updateInterests(interests: Interest[]) {
    this.interests = interests;
  }

  //Favorite
  async addFavorite(createFavorite: Favorite) {
    this.favorites.push(createFavorite);
  }

  async updateFavorite(favorite: Interest) {
    const existIndex = this.favorites.findIndex(
      (element) => element.id == favorite.id,
    );
    this.favorites[existIndex] = favorite;
  }

  async removeFavorite(id: string) {
    this.favorites = this.favorites.filter((element) => element.id != id);
  }

  async updateFavorites(favorites: Favorite[]) {
    this.favorites = favorites;
  }

  //EventCategory
  async addEventCategory(createEventCategory: EventCategory) {
    this.eventCategories.push(createEventCategory);
  }

  async updateEventCategory(eventCategory: EventCategory) {
    const existIndex = this.eventCategories.findIndex(
      (element) => element.id == eventCategory.id,
    );
    this.eventCategories[existIndex] = eventCategory;
  }

  async removeEventCategory(id: string) {
    this.eventCategories = this.eventCategories.filter(
      (element) => element.id != id,
    );
  }

  async updateEventCategorys(eventCategories: EventCategory[]) {
    this.eventCategories = eventCategories;
  }
}
