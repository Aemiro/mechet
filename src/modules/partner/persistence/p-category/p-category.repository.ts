import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnerCategory } from '@partner/domains/partner/partner-category';
import { PartnerCategoryEntity } from '@partner/persistence/partner/partner-category.entity';
import { PCategoryEntity } from './p-category.entity';
import { PCategory } from '@partner/domains/p-category/p-category';
import { IPCategory } from '@partner/domains/p-category/p-category.repository.interface';

export class PCategoryRepository implements IPCategory {
  constructor(
    @InjectRepository(PCategoryEntity)
    private categoryRepository: Repository<PCategoryEntity>,
  ) {}
  async insert(category: PCategory): Promise<PCategory> {
    const categoryEntity = this.toCategoryEntity(category);
    const result = await this.categoryRepository.save(categoryEntity);
    return result ? this.toCategory(result) : null;
  }
  async update(id: string, category: PCategory): Promise<PCategory> {
    const categoryEntity = this.toCategoryEntity(category);
    const result = await this.categoryRepository.save(categoryEntity);
    return result ? this.toCategory(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.categoryRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<PCategory[]> {
    const categories = await this.categoryRepository.find({
      withDeleted: withDeleted,
      relations: ['partnerCategories'],
    });
    if (!categories.length) return null;
    return categories.map((category) => this.toCategory(category));
  }
  async getById(id: string, withDeleted?: boolean): Promise<PCategory> {
    const category = await this.categoryRepository.find({
      where: { id: id },
      relations: ['partnerCategories'],
      withDeleted: withDeleted,
    });
    if (!category[0]) return null;
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

  toCategory(categoryEntity: PCategoryEntity): PCategory {
    const category: PCategory = new PCategory();
    category.id = categoryEntity.id;
    category.name = categoryEntity.name;
    category.description = categoryEntity.description;
    category.createdAt = categoryEntity.createdAt;
    category.updatedAt = categoryEntity.updatedAt;
    category.deletedAt = categoryEntity.deletedAt;
    category.createdBy = categoryEntity.createdBy;
    category.updatedBy = categoryEntity.updatedBy;
    category.deletedBy = categoryEntity.deletedBy;
    category.partnerCategories = categoryEntity.partnerCategories
      ? categoryEntity.partnerCategories.map((element) =>
          this.toPartnerCategory(element),
        )
      : [];
    return category;
  }
  toCategoryEntity(category: PCategory): PCategoryEntity {
    const categoryEntity: PCategoryEntity = new PCategoryEntity();
    categoryEntity.id = category.id;
    categoryEntity.name = category.name;
    categoryEntity.description = category.description;
    categoryEntity.createdAt = category.createdAt;
    categoryEntity.updatedAt = category.updatedAt;
    categoryEntity.deletedAt = category.deletedAt;
    categoryEntity.createdBy = category.createdBy;
    categoryEntity.updatedBy = category.updatedBy;
    categoryEntity.deletedBy = category.deletedBy;
    categoryEntity.partnerCategories = category.partnerCategories
      ? category.partnerCategories.map((element) =>
          this.toPartnerCategoryEntity(element),
        )
      : [];
    return categoryEntity;
  }

  toPartnerCategory(
    partnerCategoryEntity: PartnerCategoryEntity,
  ): PartnerCategory {
    const partnerCategory: PartnerCategory = new PartnerCategory();
    partnerCategory.id = partnerCategoryEntity.id;
    partnerCategory.categoryId = partnerCategoryEntity.categoryId;
    partnerCategory.partnerId = partnerCategoryEntity.partnerId;
    return partnerCategory;
  }
  toPartnerCategoryEntity(
    partnerCategory: PartnerCategory,
  ): PartnerCategoryEntity {
    const partnerCategoryEntity: PartnerCategoryEntity =
      new PartnerCategoryEntity();
    partnerCategoryEntity.id = partnerCategory.id;
    partnerCategoryEntity.categoryId = partnerCategory.categoryId;
    partnerCategoryEntity.partnerId = partnerCategory.partnerId;
    return partnerCategoryEntity;
  }
}
