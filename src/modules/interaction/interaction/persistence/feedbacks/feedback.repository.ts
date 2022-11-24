import { FeedbackEntity } from '@interaction/persistence/feedbacks/feedback.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFeedbackRepository } from '@interaction/domains/feedbacks/feedback.repository.interface';
import { Feedback } from '@interaction/domains/feedbacks/feedback';
@Injectable()
export class FeedbackRepository implements IFeedbackRepository {
  constructor(
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
  ) {}
  async insert(feedback: Feedback): Promise<Feedback> {
    const feedbackEntity = this.toFeedbackEntity(feedback);
    console.log(feedbackEntity);
    const result = await this.feedbackRepository.save(feedbackEntity);
    return result ? this.toFeedback(result) : null;
  }
  async update(feedback: Feedback): Promise<Feedback> {
    const feedbackEntity = this.toFeedbackEntity(feedback);
    const result = await this.feedbackRepository.save(feedbackEntity);
    return result ? this.toFeedback(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.feedbackRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<Feedback[]> {
    const feedbacks = await this.feedbackRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!feedbacks.length) {
      return null;
    }
    return feedbacks.map((user) => this.toFeedback(user));
  }
  async getById(id: string, withDeleted = false): Promise<Feedback> {
    const feedback = await this.feedbackRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!feedback[0]) {
      return null;
    }
    return this.toFeedback(feedback[0]);
  }

  async archive(id: string): Promise<boolean> {
    const result = await this.feedbackRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.feedbackRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }
  toFeedback(feedbackEntity: FeedbackEntity): Feedback {
    const feedback = new Feedback();
    feedback.id = feedbackEntity.id;
    feedback.name = feedbackEntity.name;
    feedback.email = feedbackEntity.email;
    feedback.phoneNumber = feedbackEntity.phoneNumber;
    feedback.description = feedbackEntity.description;
    feedback.subject = feedbackEntity.subject;
    feedback.createdBy = feedbackEntity.createdBy;
    feedback.updatedBy = feedbackEntity.updatedBy;
    feedback.deletedBy = feedbackEntity.deletedBy;
    feedback.createdAt = feedbackEntity.createdAt;
    feedback.updatedAt = feedbackEntity.updatedAt;
    feedback.deletedAt = feedbackEntity.deletedAt;
    return feedback;
  }
  toFeedbackEntity(feedback: Feedback): FeedbackEntity {
    const feedbackEntity = new FeedbackEntity();
    feedbackEntity.id = feedback.id;
    feedbackEntity.name = feedback.name;
    feedbackEntity.email = feedback.email;
    feedbackEntity.phoneNumber = feedback.phoneNumber;
    feedbackEntity.subject = feedback.subject;
    feedbackEntity.description = feedback.description;
    feedbackEntity.createdBy = feedback.createdBy;
    feedbackEntity.updatedBy = feedback.updatedBy;
    feedbackEntity.deletedBy = feedback.deletedBy;
    feedbackEntity.createdAt = feedback.createdAt;
    feedbackEntity.updatedAt = feedback.updatedAt;
    feedbackEntity.deletedAt = feedback.deletedAt;
    return feedbackEntity;
  }
}
