import { BCategory } from '@blog/domains/b-category/b-category';
import { IBCategoryRepository } from '@blog/domains/b-category/b-category.responsibility.interface';
import { BlogCategory } from '@blog/domains/blog/blog-category';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogCategoryEntity } from '../blog/blog-category.entity';
import { BCategoryEntity } from './b-category.entity';

export class BCategoryRepository implements IBCategoryRepository {
  constructor(
    @InjectRepository(BCategoryEntity)
    private categoryRepository: Repository<BCategoryEntity>,
  ) {}
  async insert(category: BCategory): Promise<BCategory> {
    const categoryEntity = this.toCategoryEtity(category);
    const result = await this.categoryRepository.save(categoryEntity);
    return result ? this.toCategory(result) : null;
  }
  async update(id: string, category: BCategory): Promise<BCategory> {
    const categoryEntity = this.toCategoryEtity(category);
    const result = await this.categoryRepository.save(categoryEntity);
    return result ? this.toCategory(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.categoryRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted = false): Promise<BCategory[]> {
    const categories = await this.categoryRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!categories.length) {
      return null;
    }
    return categories.map((category) => this.toCategory(category));
  }
  async getById(id: string, withDeleted = false): Promise<BCategory> {
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

  toCategory(categoryEntity: BCategoryEntity): BCategory {
    const category: BCategory = new BCategory();
    category.id = categoryEntity.id;
    category.name = categoryEntity.name;
    category.description = categoryEntity.description;
    category.coverImage = categoryEntity.coverImage;
    category.blogCategories = categoryEntity.blogCategories
      ? categoryEntity.blogCategories.map((element) =>
          this.toBlogCategory(element),
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
  toCategoryEtity(category: BCategory): BCategoryEntity {
    const categoryEntity: BCategoryEntity = new BCategoryEntity();
    categoryEntity.id = category.id;
    categoryEntity.name = category.name;
    categoryEntity.description = category.description;
    categoryEntity.coverImage = category.coverImage;
    categoryEntity.blogCategories = category.blogCategories
      ? category.blogCategories.map((element) =>
          this.toBlogCategoryEntity(element),
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
  toBlogCategory(blogCategoryEntity: BlogCategoryEntity): BlogCategory {
    const blogCategory: BlogCategory = new BlogCategory();
    blogCategory.id = blogCategoryEntity.id;
    blogCategory.blogId = blogCategoryEntity.blogId;
    blogCategory.categoryId = blogCategoryEntity.categoryId;
    return blogCategory;
  }
  toBlogCategoryEntity(blogCategory: BlogCategory): BlogCategoryEntity {
    const blogCategoryEntity: BlogCategoryEntity = new BlogCategoryEntity();
    blogCategoryEntity.id = blogCategory.id;
    blogCategoryEntity.blogId = blogCategory.blogId;
    blogCategoryEntity.categoryId = blogCategory.categoryId;
    return blogCategoryEntity;
  }
}
