import { CategoryRepository } from '@partner/persistence/category/category.repository';
import {
  CreateCategoryCommand,
  UpdateCategoryCommand,
} from './category.commands';
import { CategoryResponse } from './category.response';
import { NotFoundException } from '@nestjs/common';

export class CategoryCommands {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(
    command: CreateCategoryCommand,
  ): Promise<CategoryResponse> {
    const categoryDomain = CreateCategoryCommand.fromCommands(command);
    const category = await this.categoryRepository.insert(categoryDomain);
    return CategoryResponse.fromDomain(category);
  }

  async updateCategory(
    id: string,
    command: UpdateCategoryCommand,
  ): Promise<CategoryResponse> {
    const category = await this.categoryRepository.getById(command.id);
    if (category != null) {
      const category = UpdateCategoryCommand.fromCommands(command);
      const result = await this.categoryRepository.update(id, category);
      return CategoryResponse.fromDomain(result);
    }
    throw new NotFoundException(`Category not found with id ${command.id}`);
  }

  async deleteCategory(id: string): Promise<boolean> {
    const category = await this.categoryRepository.getById(id, true);
    if (!category) {
      throw new NotFoundException(`Category not found with id ${id}`);
    }
    const result = await this.categoryRepository.delete(id);
    return result;
  }

  async archiveCategory(id: string): Promise<boolean> {
    const category = await this.categoryRepository.getById(id, true);
    if (!category) {
      throw new NotFoundException(`category not found with id ${id}`);
    }
    return await this.categoryRepository.archive(id);
  }
  async restoreCategory(id: string): Promise<CategoryResponse> {
    const category = await this.categoryRepository.getById(id, true);
    if (!category) {
      throw new NotFoundException(`category not found with id ${id}`);
    }
    const result = await this.categoryRepository.restore(id);

    if (result) {
      //partner.deletedAt = null;
    }
    return CategoryResponse.fromDomain(category);
  }
}
