import { Interest } from '@interaction/domains/interests/interest';
import { IInterest } from '@interaction/domains/interests/interest.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterestEntity } from './interest.entity';

@Injectable()
export class InterestRepository implements IInterest {
  constructor(
    @InjectRepository(InterestEntity)
    private interestRepository: Repository<InterestEntity>,
  ) {}
  async insert(interest: Interest): Promise<Interest> {
    const interestEntity = this.toInterestEntity(interest);
    const result = await this.interestRepository.save(interestEntity);
    return result ? this.toInterest(result) : null;
  }
  async update(id: string, interest: Interest): Promise<Interest> {
    const interestEntity = this.toInterestEntity(interest);
    const result = await this.interestRepository.save(interestEntity);
    return result ? this.toInterest(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.interestRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<Interest[]> {
    const interests = await this.interestRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!interests.length) {
      return null;
    }
    return interests.map((interest) => this.toInterest(interest));
  }
  async getById(id: string, withDeleted = false): Promise<Interest> {
    const interest = await this.interestRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!interest[0]) {
      return null;
    }
    return this.toInterest(interest[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.interestRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.interestRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }

  toInterestEntity(interest: Interest): InterestEntity {
    const interestEntity: InterestEntity = new InterestEntity();
    interestEntity.id = interest.id;
    interestEntity.userId = interest.userId;
    interestEntity.eventId = interest.eventId;
    return interestEntity;
  }

  toInterest(interestEntity: InterestEntity): Interest {
    const interest: Interest = new Interest();
    interest.id = interestEntity.id;
    interest.userId = interestEntity.userId;
    interest.eventId = interestEntity.eventId;
    return interest;
  }
}
