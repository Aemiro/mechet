import { Favorite } from '@interaction/domains/user-interaction/favorites/favorite';
import { FavoriteRepository } from '@interaction/persistence/user-interaction/favorites/favorite.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteCommand } from './favorite.command';
import { FavoriteResponse } from './favorite.response';

@Injectable()
export class FavoriteCommands {
  private favoriteDomain = new Favorite();
  constructor(private favoriteRepository: FavoriteRepository) {}

  async createFavorite(
    command: CreateFavoriteCommand,
  ): Promise<FavoriteResponse> {
    this.favoriteDomain = CreateFavoriteCommand.fromCommands(command);
    const result = await this.favoriteRepository.insert(this.favoriteDomain);
    return FavoriteResponse.fromDomain(result);
  }
  async removeFavorite(id: string): Promise<boolean> {
    const favorite = await this.favoriteRepository.getById(id);
    if (!favorite) {
      throw new NotFoundException(`favorite not found with id ${id}`);
    }
    const result = await this.favoriteRepository.delete(id);

    return result;
  }
}
