import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@partner/domains/category/category';
import { ICategory } from '@partner/domains/category/category.repository.interface';
import { CategoryEntity } from '@partner/persistence/category/category.entity';
import { Repository } from 'typeorm';
import { PartnerCategory } from '@partner/domains/partner/partner-category';
import { PartnerCategoryEntity } from '@partner/persistence/partner/partner-category.entity';

export class CategoryRepository implements ICategory {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}
  async insert(category: Category): Promise<Category> {
    const categoryEntity = this.toCategoryEntity(category);
    const result = await this.categoryRepository.save(categoryEntity);
    return result ? this.toCategory(result) : null;
  }
  async update(id: string, category: Category): Promise<Category> {
    const categoryEntity = this.toCategoryEntity(category);
    const result = await this.categoryRepository.save(categoryEntity);
    return result ? this.toCategory(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.categoryRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      withDeleted: withDeleted,
      relations: ['partner_categories'],
    });
    if (!categories.length) return null;
    return categories.map((category) => this.toCategory(category));
  }
  async getById(id: string, withDeleted?: boolean): Promise<Category> {
    const category = await this.categoryRepository.find({
      where: { id: id },
      relations: ['partner_categories'],
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

  toCategory(categoryEntity: CategoryEntity): Category {
    const category: Category = new Category();
    category.id = categoryEntity.id;
    category.name = categoryEntity.name;
    category.description = categoryEntity.description;
    category.partnerCategories = categoryEntity.partnerCategories
      ? categoryEntity.partnerCategories.map((element) =>
          this.toPartnerCategory(element),
        )
      : [];
    return category;
  }
  toCategoryEntity(category: Category): CategoryEntity {
    const categoryEntity: CategoryEntity = new CategoryEntity();
    categoryEntity.id = category.id;
    categoryEntity.name = category.name;
    categoryEntity.description = category.description;
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
