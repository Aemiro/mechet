import { EventComment } from '@event/domains/event/event-comment';
import { IEventCommentRepository } from '@event/domains/event/event-comment.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCommentEntity } from './event-comment.entity';

export class EventCommentRepository implements IEventCommentRepository {
  constructor(
    @InjectRepository(EventCommentEntity)
    private eventCommentRepository: Repository<EventCommentEntity>,
  ) {}

  async insert(eventComment: EventComment): Promise<EventComment> {
    const evenCommenttEntity = this.toEventCommentEntity(eventComment);
    const result = await this.eventCommentRepository.save(evenCommenttEntity);
    return result ? this.toEventComment(result) : null;
  }
  async update(id: string, eventComment: EventComment): Promise<EventComment> {
    const evenCommenttEntity = this.toEventCommentEntity(eventComment);
    const result = await this.eventCommentRepository.save(evenCommenttEntity);
    return result ? this.toEventComment(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.eventCommentRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<EventComment[]> {
    const eventComments = await this.eventCommentRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!eventComments.length) {
      return null;
    }
    return eventComments.map((eventComment) =>
      this.toEventComment(eventComment),
    );
  }
  async getById(id: string, withDeleted: boolean): Promise<EventComment> {
    const eventComment = await this.eventCommentRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!eventComment[0]) {
      return null;
    }
    return this.toEventComment(eventComment[0]);
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
