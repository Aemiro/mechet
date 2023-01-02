import { Favorite } from '@interaction/domains/user-interaction/favorites/favorite';
import { IFavorite } from '@interaction/domains/user-interaction/favorites/favorite.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './favorite.entity';

@Injectable()
export class FavoriteRepository implements IFavorite {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
  ) {}
  async insert(favorite: Favorite): Promise<Favorite> {
    const favoriteEntity = this.toFavoriteEntity(favorite);
    const result = await this.favoriteRepository.save(favoriteEntity);
    return result ? this.toFavorite(result) : null;
  }
  async update(id: string, favorite: Favorite): Promise<Favorite> {
    const favoriteEntity = this.toFavoriteEntity(favorite);
    const result = await this.favoriteRepository.save(favoriteEntity);
    return result ? this.toFavorite(result) : null;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.favoriteRepository.delete({ id: id });
    if (result.affected > 0) return true;
    return false;
  }
  async getAll(withDeleted: boolean): Promise<Favorite[]> {
    const favorites = await this.favoriteRepository.find({
      relations: [],
      withDeleted: withDeleted,
    });
    if (!favorites.length) {
      return null;
    }
    return favorites.map((favorite) => this.toFavorite(favorite));
  }
  async getById(id: string, withDeleted = false): Promise<Favorite> {
    const favorite = await this.favoriteRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!favorite[0]) {
      return null;
    }
    return this.toFavorite(favorite[0]);
  }
  async archive(id: string): Promise<boolean> {
    const result = await this.favoriteRepository.softDelete(id);
    if (result.affected > 0) return true;
    return false;
  }
  async restore(id: string): Promise<boolean> {
    const result = await this.favoriteRepository.restore(id);
    if (result.affected > 0) return true;
    return false;
  }

  toFavoriteEntity(favorite: Favorite): FavoriteEntity {
    const favoriteEntity: FavoriteEntity = new FavoriteEntity();
    favoriteEntity.id = favorite.id;
    favoriteEntity.userId = favorite.userId;
    favoriteEntity.eventId = favorite.eventId;
    return favoriteEntity;
  }

  toFavorite(favoriteEntity: FavoriteEntity): Favorite {
    const favorite: Favorite = new Favorite();
    favorite.id = favoriteEntity.id;
    favorite.userId = favoriteEntity.userId;
    favorite.eventId = favoriteEntity.eventId;
    return favorite;
  }
}
