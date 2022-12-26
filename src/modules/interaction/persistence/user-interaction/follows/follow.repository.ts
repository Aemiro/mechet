import { Follow } from '@interaction/domains/user-interaction/follows/follow';
import { IFollow } from '@interaction/domains/user-interaction/follows/follow.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowEntity } from './follow.entity';

@Injectable()
export class FollowRepository implements IFollow {
  constructor(
    @InjectRepository(FollowEntity)
    private followRepository: Repository<FollowEntity>,
  ) {}

  async insert(follow: Follow): Promise<Follow> {
    const followEntity = this.toFollowEntity(follow);
    const result = await this.followRepository.save(followEntity);
    return result ? this.toFollow(result) : null;
  }
  async update(id: string, follow: Follow): Promise<Follow> {
    const followEntity = this.toFollowEntity(follow);
    const result = await this.followRepository.save(followEntity);
    return result ? this.toFollow(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.followRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<Follow[]> {
    const follows = await this.followRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!follows.length) {
      return null;
    }
    return follows.map((follow) => this.toFollow(follow));
  }
  async getById(id: string, withDeleted: boolean): Promise<Follow> {
    const follow = await this.followRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!follow[0]) {
      return null;
    }
    return this.toFollow(follow[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.followRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.followRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }

  toFollowEntity(follow: Follow): FollowEntity {
    const followEntity: FollowEntity = new FollowEntity();
    followEntity.id = follow.id;
    followEntity.userId = follow.userId;
    followEntity.branchId = follow.branchId;
    return followEntity;
  }

  toFollow(followEntity: FollowEntity): Follow {
    const follow: Follow = new Follow();
    follow.id = followEntity.id;
    follow.userId = followEntity.userId;
    follow.branchId = followEntity.branchId;
    return follow;
  }
}
