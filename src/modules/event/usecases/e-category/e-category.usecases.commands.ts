import { ECategory } from '@event/domains/e-category/e-category';
import { ECategoryRepository } from '@event/persistence/e-category/e-category.repository';
import { FileManagerService } from '@libs/common/file-manager';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateECategoryCommand,
  UpdateECategoryCommand,
} from './e-category.commands';
import { ECategoryResponse } from './e-category.response';

@Injectable()
export class ECategoryCommands {
  private categoryDomain = new ECategory();
  constructor(
    private categoryRepository: ECategoryRepository,
    private readonly fileManagerService: FileManagerService,
  ) {}

  async createCategory(
    command: CreateECategoryCommand,
  ): Promise<ECategoryResponse> {
    const category = CreateECategoryCommand.fromCommands(command);
    const result = await this.categoryRepository.insert(category);
    return ECategoryResponse.fromDomain(result);
  }

  async updateCategory(
    id: string,
    command: UpdateECategoryCommand,
  ): Promise<ECategoryResponse> {
    let category = await this.categoryRepository.getById(command.id, true);
    if (category != null) {
      category = UpdateECategoryCommand.fromCommands(command);
      const result = await this.categoryRepository.update(id, category);
      return ECategoryResponse.fromDomain(result);
    }
  }

  async DeleteCategory(id: string): Promise<boolean> {
    const category = await this.categoryRepository.getById(id, true);
    if (!category) {
      throw new NotFoundException(`category not found with id ${id}`);
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

  async RestoreCategory(id: string): Promise<ECategoryResponse> {
    const category = await this.categoryRepository.getById(id, true);
    if (!category) {
      throw new NotFoundException(`category not found with id ${id}`);
    }
    const result = await this.categoryRepository.restore(id);
    if (result) {
      category.deletedAt = null;
    }
    return ECategoryResponse.fromDomain(category);
  }
}
