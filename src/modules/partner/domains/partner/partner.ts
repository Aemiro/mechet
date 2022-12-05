import { Follow } from '@interaction/domains/user-interaction/follows/follow';
import { PartnerReview } from '@interaction/domains/user-interaction/partner-reviews/partner-review';
import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { Location } from '@libs/common/location';
import { Schedule } from './schedule';
import { Address } from '@libs/common/address';
import { PartnerCategory } from './partner-category';

export class Partner {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  coverImage: FileDto;
  website: string;
  logo: FileDto;
  about: string;
  registrationDate: Date;
  status: string;
  address: Address;
  location: Location;
  averageRate: AverageRate;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
  schedules: Schedule[];
  follows: Follow[];
  partnerReviews: PartnerReview[];
  partnerCategories: PartnerCategory[];

  //partner category
  async addPartnerCategory(createPartnerCategory: PartnerCategory) {
    this.partnerCategories.push(createPartnerCategory);
  }

  async updatePartnerCategory(partnerCategorie: PartnerCategory) {
    const existIndex = this.partnerCategories.findIndex(
      (element) => element.id == partnerCategorie.id,
    );
    this.partnerCategories[existIndex] = partnerCategorie;
  }

  async removePartnerCategory(id: string) {
    this.partnerCategories = this.partnerCategories.filter(
      (element) => element.id != id,
    );
  }

  async updatePartnerCategories(partnerCategories: PartnerCategory[]) {
    this.partnerCategories = partnerCategories;
  }

  //schedule
  async addSchedule(createSchedule: Schedule) {
    this.schedules.push(createSchedule);
  }

  async updateSchedule(schedule: Schedule) {
    const existIndex = this.schedules.findIndex(
      (element) => element.id == schedule.id,
    );
    this.schedules[existIndex] = schedule;
  }

  async removeSchedule(id: string) {
    this.schedules = this.schedules.filter((element) => element.id != id);
  }

  async updateSchedules(schedules: Schedule[]) {
    this.schedules = schedules;
  }
  //follow
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
  //partner review
  async addPartnerReview(createPartnerReview: PartnerReview) {
    this.partnerReviews.push(createPartnerReview);
  }

  async updatePartnerReview(partnerReview: PartnerReview) {
    const existIndex = this.partnerReviews.findIndex(
      (element) => element.id == partnerReview.id,
    );
    this.follows[existIndex] = partnerReview;
  }

  async removePartnerReview(id: string) {
    this.partnerReviews = this.partnerReviews.filter(
      (element) => element.id != id,
    );
  }

  async updatePartnerReviews(partnerReviews: PartnerReview[]) {
    this.partnerReviews = partnerReviews;
  }
}
