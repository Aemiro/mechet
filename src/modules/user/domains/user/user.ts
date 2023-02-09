import { FileDto } from '@libs/common/file-dto';
import { Address } from '@libs/common/address';
import { EventComment } from '@event/domains/event/event-comment';
import { BlogComment } from '@blog/domains/blog/blog-comment';
import { Favorite } from '@interaction/domains/favorites/favorite';
import { Follow } from '@interaction/domains/follows/follow';
import { Interest } from '@interaction/domains/interests/interest';
import { Location } from '@libs/common/location';
import { EventReview } from '@interaction/domains/event-reviews/event-review';
import { BranchReview } from '@interaction/domains/branch-reviews/branch-review';
export class User {
  id: string;
  partnerId: string;
  branchId: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  password: string;
  enabled: boolean;
  profileImage: FileDto;
  address: Address;
  location: Location;
  role: string[];

  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;

  eventComments: EventComment[];
  blogComments: BlogComment[];
  favorites: Favorite[];
  follows: Follow[];
  interests: Interest[];
  branchReviews: BranchReview[];
  eventReviews: EventReview[];

  //event comment
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

  //blog comment
  async addBlogComment(createBlogComment: BlogComment) {
    this.blogComments.push(createBlogComment);
  }

  async updateBlogComment(blogComment: BlogComment) {
    const existIndex = this.blogComments.findIndex(
      (element) => element.id == blogComment.id,
    );
    this.blogComments[existIndex] = blogComment;
  }

  async removeBlogComment(id: string) {
    this.blogComments = this.blogComments.filter((element) => element.id != id);
  }

  async updateBlogComments(blogComments: BlogComment[]) {
    this.blogComments = blogComments;
  }

  //Favorite
  async addFavorite(createFavorite: Favorite) {
    this.favorites.push(createFavorite);
  }

  async updateFavorite(favorite: Favorite) {
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

  //Follow
  async addFollow(createFollow: Follow) {
    this.follows.push(createFollow);
  }

  async updateFollow(follow: Follow) {
    const existIndex = this.follows.findIndex(
      (element) => element.id == follow.id,
    );
    this.follows[existIndex] = follow;
  }

  async removeFollow(id: string) {
    this.follows = this.follows.filter((element) => element.id != id);
  }

  async updateFollows(follows: Follow[]) {
    this.follows = follows;
  }

  //Interest
  async addInterest(createFavorite: Interest) {
    this.interests.push(createFavorite);
  }

  async updateInterest(favorite: Interest) {
    const existIndex = this.favorites.findIndex(
      (element) => element.id == favorite.id,
    );
    this.favorites[existIndex] = favorite;
  }

  async removeInterest(id: string) {
    this.favorites = this.favorites.filter((element) => element.id != id);
  }

  async updateInterests(favorites: Interest[]) {
    this.favorites = favorites;
  }

  //Branch Review
  async addBranchReview(createbranchReview: BranchReview) {
    this.branchReviews.push(createbranchReview);
  }

  async updateBranchReview(branchReview: BranchReview) {
    const existIndex = this.branchReviews.findIndex(
      (element) => element.id == branchReview.id,
    );
    this.branchReviews[existIndex] = branchReview;
  }

  async removeBranchReview(id: string) {
    this.branchReviews = this.branchReviews.filter(
      (element) => element.id != id,
    );
  }

  async updateBranchReviews(branchReviews: BranchReview[]) {
    this.branchReviews = branchReviews;
  }

  //Event Review
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
}
