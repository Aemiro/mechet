import { Injectable, NotFoundException } from '@nestjs/common';
import { PCategoryRepository } from '@partner/persistence/p-category/p-category.repository';
import {
  CreatePCategoryCommand,
  UpdatePCategoryCommand,
} from './p-category.commands';
import { PCategoryResponse } from './p-category.response';

@Injectable()
export class PCategoryCommands {
  constructor(private categoryRepository: PCategoryRepository) {}

  async createCategory(
    command: CreatePCategoryCommand,
  ): Promise<PCategoryResponse> {
    const categoryDomain = CreatePCategoryCommand.fromCommands(command);
    const category = await this.categoryRepository.insert(categoryDomain);
    return PCategoryResponse.fromDomain(category);
  }

  async updateCategory(
    id: string,
    command: UpdatePCategoryCommand,
  ): Promise<PCategoryResponse> {
    const category = await this.categoryRepository.getById(command.id);
    if (category != null) {
      const category = UpdatePCategoryCommand.fromCommands(command);
      const result = await this.categoryRepository.update(id, category);
      return PCategoryResponse.fromDomain(result);
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
  async restoreCategory(id: string): Promise<PCategoryResponse> {
    const category = await this.categoryRepository.getById(id, true);
    if (!category) {
      throw new NotFoundException(`category not found with id ${id}`);
    }
    const result = await this.categoryRepository.restore(id);

    if (result) {
      //partner.deletedAt = null;
    }
    return PCategoryResponse.fromDomain(category);
  }
}
