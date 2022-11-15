import { Feedback } from '@interaction/domains/feedbacks/feedback';
import { FeedbackEntity } from '@interaction/persistence/feedbacks/feedback.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FeedbackResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdBy?: string;
  @ApiProperty()
  updatedBy?: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt?: Date;
  @ApiProperty()
  deletedBy?: string;
  static fromEntity(feedbackEntity: FeedbackEntity): FeedbackResponse {
    const feedbackResponse = new FeedbackResponse();
    feedbackResponse.id = feedbackEntity.id;
    feedbackResponse.name = feedbackEntity.name;
    feedbackResponse.email = feedbackEntity.email;
    feedbackResponse.phoneNumber = feedbackEntity.phoneNumber;
    feedbackResponse.subject = feedbackEntity.subject;
    feedbackResponse.description = feedbackEntity.description;
    feedbackResponse.createdBy = feedbackEntity.createdBy;
    feedbackResponse.updatedBy = feedbackEntity.updatedBy;
    feedbackResponse.deletedBy = feedbackEntity.deletedBy;
    feedbackResponse.createdAt = feedbackEntity.createdAt;
    feedbackResponse.updatedAt = feedbackEntity.updatedAt;
    feedbackResponse.deletedAt = feedbackEntity.deletedAt;
    return feedbackResponse;
  }
  static fromDomain(feedback: Feedback): FeedbackResponse {
    const feedbackResponse = new FeedbackResponse();
    feedbackResponse.id = feedback.id;
    feedbackResponse.name = feedback.name;
    feedbackResponse.email = feedback.email;
    feedbackResponse.phoneNumber = feedback.phoneNumber;
    feedbackResponse.subject = feedback.subject;
    feedbackResponse.description = feedback.description;
    feedbackResponse.createdBy = feedback.createdBy;
    feedbackResponse.updatedBy = feedback.updatedBy;
    feedbackResponse.deletedBy = feedback.deletedBy;
    feedbackResponse.createdAt = feedback.createdAt;
    feedbackResponse.updatedAt = feedback.updatedAt;
    feedbackResponse.deletedAt = feedback.deletedAt;
    return feedbackResponse;
  }
}
