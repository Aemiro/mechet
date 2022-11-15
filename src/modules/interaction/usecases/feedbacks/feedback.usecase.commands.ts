import { CreateFeedbackCommand } from './feedback.commands';
import { FeedbackRepository } from '@interaction/persistence/feedbacks/feedback.repository';
import { FeedbackResponse } from './feedback.response';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class FeedbackCommands {
  constructor(private feedbackRepository: FeedbackRepository) {}
  async createFeedback(
    command: CreateFeedbackCommand,
  ): Promise<FeedbackResponse> {
    const feedbackDomain = CreateFeedbackCommand.fromCommand(command);
    console.log(feedbackDomain);
    const feedback = await this.feedbackRepository.insert(feedbackDomain);
    return FeedbackResponse.fromDomain(feedback);
  }

  async archiveFeedback(id: string): Promise<boolean> {
    const feedbackDomain = await this.feedbackRepository.getById(id);
    if (!feedbackDomain) {
      throw new NotFoundException(`Feedback not found with id ${id}`);
    }
    return await this.feedbackRepository.archive(id);
  }
  async restoreFeedback(id: string): Promise<FeedbackResponse> {
    const feedbackDomain = await this.feedbackRepository.getById(id, true);
    if (!feedbackDomain) {
      throw new NotFoundException(`Feedback not found with id ${id}`);
    }
    const r = await this.feedbackRepository.restore(id);
    if (r) {
      feedbackDomain.deletedAt = null;
    }
    return FeedbackResponse.fromDomain(feedbackDomain);
  }
  async deleteFeedback(id: string): Promise<boolean> {
    const feedbackDomain = await this.feedbackRepository.getById(id, true);
    if (!feedbackDomain) {
      throw new NotFoundException(`Feedback not found with id ${id}`);
    }
    return await this.feedbackRepository.delete(id);
  }
}
