import { ECategory } from '@event/domains/e-category/e-category';
import { IECategoryRepository } from '@event/domains/e-category/e-category.repository.interface';
import { EventCategory } from '@event/domains/event/event-category';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategoryEntity } from '../event/event-category.entity';
import { ECategoryEntity } from './e-category.entity';

export class ECategoryRepository implements IECategoryRepository {
  constructor(
    @InjectRepository(ECategoryEntity)
    private categoryRepository: Repository<ECategoryEntity>,
  ) {}
  async insert(category: ECategory): Promise<ECategory> {
    const categoryEntity = this.toCategoryEtity(category);
    const result = await this.categoryRepository.save(categoryEntity);
    return result ? this.toCategory(result) : null;
  }
  async update(id: string, category: ECategory): Promise<ECategory> {
    const categoryEntity = this.toCategoryEtity(category);
    const result = await this.categoryRepository.save(categoryEntity);
    return result ? this.toCategory(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.categoryRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<ECategory[]> {
    const categories = await this.categoryRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!categories.length) {
      return null;
    }
    return categories.map((category) => this.toCategory(category));
  }
  async getById(id: string, withDeleted: boolean): Promise<ECategory> {
    const category = await this.categoryRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!category[0]) {
      return null;
    }
    return this.toCategory(category[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.categoryRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.categoryRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }

  toCategory(categoryEntity: ECategoryEntity): ECategory {
    const category: ECategory = new ECategory();
    category.id = categoryEntity.id;
    category.name = categoryEntity.name;
    category.description = categoryEntity.description;
    category.coverImage = categoryEntity.coverImage;
    category.eventCategories = categoryEntity.eventCategories
      ? categoryEntity.eventCategories.map((element) =>
          this.toEventCategory(element),
        )
      : [];
    category.createdBy = categoryEntity.createdBy;
    category.updatedBy = categoryEntity.updatedBy;
    category.deletedBy = categoryEntity.deletedBy;
    category.createdAt = categoryEntity.createdAt;
    category.updatedAt = categoryEntity.updatedAt;
    category.deletedAt = categoryEntity.deletedAt;
    return category;
  }
  toCategoryEtity(category: ECategory): ECategoryEntity {
    const categoryEntity: ECategoryEntity = new ECategoryEntity();
    categoryEntity.id = category.id;
    categoryEntity.name = category.name;
    categoryEntity.description = category.description;
    categoryEntity.coverImage = category.coverImage;
    categoryEntity.eventCategories = category.eventCategories
      ? category.eventCategories.map((element) =>
          this.toEventCategoryEntity(element),
        )
      : [];
    categoryEntity.createdBy = category.createdBy;
    categoryEntity.updatedBy = category.updatedBy;
    categoryEntity.deletedBy = category.deletedBy;
    categoryEntity.createdAt = category.createdAt;
    categoryEntity.updatedAt = category.updatedAt;
    categoryEntity.deletedAt = category.deletedAt;
    return categoryEntity;
  }
  toEventCategory(eventCategoryEntity: EventCategoryEntity): EventCategory {
    const eventCategory: EventCategory = new EventCategory();
    eventCategory.id = eventCategoryEntity.id;
    eventCategory.eventId = eventCategoryEntity.eventId;
    eventCategory.categoryId = eventCategoryEntity.categoryId;
    return eventCategory;
  }
  toEventCategoryEntity(eventCategory: EventCategory): EventCategoryEntity {
    const eventCategoryEntity: EventCategoryEntity = new EventCategoryEntity();
    eventCategoryEntity.id = eventCategory.id;
    eventCategoryEntity.eventId = eventCategory.eventId;
    eventCategoryEntity.categoryId = eventCategory.categoryId;
    return eventCategoryEntity;
  }
}
