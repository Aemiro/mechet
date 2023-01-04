import { EventReview } from '@interaction/domains/user-interaction/event-reviews/event-review';
import { IEventReview } from '@interaction/domains/user-interaction/event-reviews/event-review.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventReviewEntity } from './event-review.entity';

@Injectable()
export class EventReviewRepository implements IEventReview {
  constructor(
    @InjectRepository(EventReviewEntity)
    private eventReviewRepository: Repository<EventReviewEntity>,
  ) {}
  async insert(eventReview: EventReview): Promise<EventReview> {
    const eventReviewEntity = this.toEventReviewEntity(eventReview);
    const result = await this.eventReviewRepository.save(eventReviewEntity);
    return result ? this.toEventReview(result) : null;
  }
  async update(id: string, eventReview: EventReview): Promise<EventReview> {
    const eventReviewEntity = this.toEventReviewEntity(eventReview);
    const result = await this.eventReviewRepository.save(eventReviewEntity);
    return result ? this.toEventReview(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.eventReviewRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<EventReview[]> {
    const eventReviews = await this.eventReviewRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!eventReviews.length) {
      return null;
    }
    return eventReviews.map((eventReview) => this.toEventReview(eventReview));
  }
  async getById(id: string, withDeleted = false): Promise<EventReview> {
    const eventReview = await this.eventReviewRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!eventReview[0]) {
      return null;
    }
    return this.toEventReview(eventReview[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.eventReviewRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.eventReviewRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }

  toEventReviewEntity(eventReview: EventReview): EventReviewEntity {
    const eventReviewEntity: EventReviewEntity = new EventReviewEntity();
    eventReviewEntity.id = eventReview.id;
    eventReviewEntity.userId = eventReview.userId;
    eventReviewEntity.eventId = eventReview.eventId;
    eventReviewEntity.description = eventReview.description;
    eventReviewEntity.rate = eventReview.rate;
    return eventReviewEntity;
  }

  toEventReview(eventReviewEntity: EventReviewEntity): EventReview {
    const eventReview: EventReview = new EventReview();
    eventReview.id = eventReviewEntity.id;
    eventReview.userId = eventReviewEntity.userId;
    eventReview.eventId = eventReviewEntity.eventId;
    eventReview.description = eventReviewEntity.description;
    eventReview.rate = eventReviewEntity.rate;
    return eventReview;
  }
}
