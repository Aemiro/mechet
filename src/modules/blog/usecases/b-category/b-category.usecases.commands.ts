import { BCategory } from '@blog/domains/b-category/b-category';
import { BCategoryRepository } from '@blog/persistence/b-category/b-category.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateBCategoryCommand,
  UpdateBCategoryCommand,
} from './b-category.commands';
import { BCategoryResponse } from './b-category.response';

@Injectable()
export class BCategoryCommands {
  private categoryDomain = new BCategory();
  constructor(private categoryRepository: BCategoryRepository) {}

  async createCategory(
    command: CreateBCategoryCommand,
  ): Promise<BCategoryResponse> {
    const category = CreateBCategoryCommand.fromCommands(command);
    const result = await this.categoryRepository.insert(category);
    return BCategoryResponse.fromDomain(result);
  }

  async updateCategory(
    id: string,
    command: UpdateBCategoryCommand,
  ): Promise<BCategoryResponse> {
    let category = await this.categoryRepository.getById(command.id);
    if (category != null) {
      category = UpdateBCategoryCommand.fromCommands(command);
      const result = await this.categoryRepository.update(id, category);
      return BCategoryResponse.fromDomain(result);
    }
  }

  async DeleteCategory(id: string): Promise<boolean> {
    const category = await this.categoryRepository.getById(id, true);
    if (!category) {
      throw new NotFoundException(` category not found with id ${id}`);
    }
    const result = await this.categoryRepository.delete(id);

    return result;
  }

  async ArchiveCategory(id: string): Promise<boolean> {
    const category = await this.categoryRepository.getById(id, true);
    if (!category) {
      throw new NotFoundException(`category not found with id ${id}`);
    }
    return await this.categoryRepository.archive(id);
  }

  async RestoreCategory(id: string): Promise<BCategoryResponse> {
    const category = await this.categoryRepository.getById(id, true);
    if (!category) {
      throw new NotFoundException(`category not found with id ${id}`);
    }
    const result = await this.categoryRepository.restore(id);
    if (result) {
      category.deletedAt = null;
    }
    return BCategoryResponse.fromDomain(category);
  }
}
