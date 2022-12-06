import { Follow } from '@interaction/domains/user-interaction/follows/follow';
import { PartnerReview } from '@interaction/domains/user-interaction/partner-reviews/partner-review';
import { FollowEntity } from '@interaction/persistence/user-interaction/follow.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from '@partner/domains/partner/partner';
import { IPartner } from '@partner/domains/partner/partner.repository.interface';
import { Schedule } from '@partner/domains/partner/schedule';
import { Repository } from 'typeorm';
import { PartnerEntity } from './partner.entity';
import { ScheduleEntity } from './schedule.entity';
import { PartnerCategoryEntity } from './partner-category.entity';
import { PartnerCategory } from '@partner/domains/partner/partner-category';
import { PartnerReviewEntity } from '@interaction/persistence/user-interaction/partner-review.entity';

export class PartnerRepository implements IPartner {
  constructor(
    @InjectRepository(PartnerEntity)
    private partnerRepository: Repository<PartnerEntity>,
  ) {}
  async insert(partner: Partner): Promise<Partner> {
    const partnerEntity = this.toPartnerEntity(partner);
    const result = await this.partnerRepository.save(partnerEntity);
    return result ? this.toPartner(result) : null;
  }
  async update(id: string, partner: Partner): Promise<Partner> {
    const partnerEntity = this.toPartnerEntity(partner);
    const result = await this.partnerRepository.save(partnerEntity);
    return result ? this.toPartner(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.partnerRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<Partner[]> {
    const partners = await this.partnerRepository.find({
      relations: [
        'schedules',
        'follows',
        'partner_reviews',
        'partner_categories',
      ],
      withDeleted: withDeleted,
    });
    if (!partners.length) {
      return null;
    }
    return partners.map((partner) => this.toPartner(partner));
  }
  async getById(id: string, withDeleted = false): Promise<Partner> {
    const partner = await this.partnerRepository.find({
      where: { id: id },
      relations: [
        'schedules',
        'follows',
        'partner_reviews, partner_categories',
      ],
      withDeleted: withDeleted,
    });
    if (!partner[0]) {
      return null;
    }
    return this.toPartner(partner[0]);
  }
  async getByPhoneNumber(
    phoneNumber: string,
    withDeleted = false,
  ): Promise<Partner> {
    const partner = await this.partnerRepository.find({
      where: { phoneNumber: phoneNumber },
      relations: [
        'schedules',
        'follows',
        'partner_reviews, partner_categories',
      ],
      withDeleted: withDeleted,
    });
    if (!partner[0]) {
      return null;
    }
    return this.toPartner(partner[0]);
  }
  async getByEmail(email: string, withDeleted: boolean): Promise<Partner> {
    const partner = await this.partnerRepository.find({
      where: { email: email },
      relations: [
        'schedules',
        'follows',
        'partner_reviews, partner_categories',
      ],
      withDeleted: withDeleted,
    });
    if (!partner[0]) {
      return null;
    }
    return this.toPartner(partner[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.partnerRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.partnerRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }
  toPartner(partnerEntity: PartnerEntity): Partner {
    const partner: Partner = new Partner();
    partner.id = partnerEntity.id;
    partner.name = partnerEntity.name;
    partner.email = partnerEntity.email;
    partner.password = partnerEntity.password;
    partner.phoneNumber = partnerEntity.phoneNumber;
    partner.coverImage = partnerEntity.coverImage;
    partner.website = partnerEntity.website;
    partner.logo = partnerEntity.logo;
    partner.about = partnerEntity.about;
    partner.registrationDate = partnerEntity.registrationDate;
    partner.status = partnerEntity.status;
    partner.address = partnerEntity.address;
    partner.location = partnerEntity.location;
    partner.averageRate = partnerEntity.averageRate;
    partner.schedules = partnerEntity.schedules
      ? partnerEntity.schedules.map((element) => this.toSchedule(element))
      : [];
    partner.follows = partnerEntity.follows
      ? partnerEntity.follows.map((element) => this.toFollow(element))
      : [];
    partner.partnerReviews = partnerEntity.partnerReviews
      ? partnerEntity.partnerReviews.map((element) =>
          this.toPartnerReview(element),
        )
      : [];
    partner.partnerCategories = partnerEntity.partnerCategories
      ? partnerEntity.partnerCategories.map((element) =>
          this.toPartnerCategory(element),
        )
      : [];

    return partner;
  }
  toPartnerEntity(partner: Partner): PartnerEntity {
    const partnerEntity: PartnerEntity = new PartnerEntity();
    partnerEntity.id = partner.id;
    partnerEntity.name = partner.name;
    partnerEntity.email = partner.email;
    partnerEntity.password = partner.password;
    partnerEntity.phoneNumber = partner.phoneNumber;
    partnerEntity.coverImage = partner.coverImage;
    partnerEntity.website = partner.website;
    partnerEntity.logo = partner.logo;
    partnerEntity.about = partner.about;
    partnerEntity.registrationDate = partner.registrationDate;
    partnerEntity.status = partner.status;
    partnerEntity.address = partner.address;
    partnerEntity.location = partner.location;
    partnerEntity.averageRate = partner.averageRate;
    partnerEntity.schedules = partner.schedules
      ? partner.schedules.map((element) => this.toScheduleEntity(element))
      : [];
    partnerEntity.follows = partner.follows
      ? partner.follows.map((element) => this.toFollowEntity(element))
      : [];
    partnerEntity.partnerReviews = partner.partnerReviews
      ? partner.partnerReviews.map((element) =>
          this.toPartnerReviewEntity(element),
        )
      : [];
    partnerEntity.partnerCategories = partner.partnerCategories
      ? partner.partnerCategories.map((element) =>
          this.toPartnerCategoryEntity(element),
        )
      : [];
    return partnerEntity;
  }
  toPartnerCategory(
    partnerCategoryEntity: PartnerCategoryEntity,
  ): PartnerCategory {
    const partnerCategory: PartnerCategory = new PartnerCategory();
    partnerCategory.id = partnerCategoryEntity.id;
    partnerCategory.partnerId = partnerCategoryEntity.partnerId;
    partnerCategory.categoryId = partnerCategoryEntity.categoryId;
    return partnerCategory;
  }
  toPartnerCategoryEntity(
    partnerCategory: PartnerCategory,
  ): PartnerCategoryEntity {
    const partnerCategoryEntity: PartnerCategoryEntity =
      new PartnerCategoryEntity();
    partnerCategoryEntity.id = partnerCategory.id;
    partnerCategoryEntity.partnerId = partnerCategory.partnerId;
    partnerCategoryEntity.categoryId = partnerCategory.categoryId;
    return partnerCategoryEntity;
  }
  toSchedule(scheduleEntity: ScheduleEntity): Schedule {
    const schedule: Schedule = new Schedule();
    schedule.id = scheduleEntity.id;
    schedule.partnerId = scheduleEntity.partnerId;
    schedule.description = scheduleEntity.description;
    schedule.daysOfWeek = scheduleEntity.daysOfWeek;
    schedule.from = scheduleEntity.from;
    schedule.to = scheduleEntity.to;
    return schedule;
  }
  toScheduleEntity(schedule: Schedule): ScheduleEntity {
    const scheduleEntity: ScheduleEntity = new ScheduleEntity();
    scheduleEntity.id = schedule.id;
    scheduleEntity.partnerId = schedule.partnerId;
    scheduleEntity.description = schedule.description;
    scheduleEntity.daysOfWeek = schedule.daysOfWeek;
    scheduleEntity.from = schedule.from;
    scheduleEntity.to = schedule.to;
    return scheduleEntity;
  }
  toFollow(followEntity: FollowEntity): Follow {
    const follow: Follow = new Follow();
    follow.id = followEntity.id;
    follow.partnerId = followEntity.partnerId;
    follow.userId = followEntity.userId;
    return follow;
  }
  toFollowEntity(follow: Follow): FollowEntity {
    const followEntity: FollowEntity = new FollowEntity();
    followEntity.id = follow.id;
    followEntity.partnerId = follow.partnerId;
    followEntity.userId = follow.userId;
    return followEntity;
  }
  toPartnerReview(partnerReviewEntity: PartnerReviewEntity): PartnerReview {
    const partnerReview: PartnerReview = new PartnerReview();
    partnerReview.id = partnerReviewEntity.id;
    partnerReview.partnerId = partnerReviewEntity.partnerId;
    partnerReview.userId = partnerReviewEntity.userId;
    partnerReview.description = partnerReviewEntity.description;
    partnerReview.rate = partnerReviewEntity.rate;
    return partnerReview;
  }
  toPartnerReviewEntity(partnerReview: PartnerReview): PartnerReviewEntity {
    const partnerReviewEntity: PartnerReviewEntity = new PartnerReviewEntity();
    partnerReviewEntity.id = partnerReview.id;
    partnerReviewEntity.partnerId = partnerReview.partnerId;
    partnerReviewEntity.userId = partnerReview.userId;
    partnerReviewEntity.description = partnerReview.description;
    partnerReviewEntity.rate = partnerReview.rate;
    return partnerReviewEntity;
  }
}
