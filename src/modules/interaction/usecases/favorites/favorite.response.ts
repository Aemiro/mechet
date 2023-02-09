import { Favorite } from '@interaction/domains/favorites/favorite';
import { FavoriteEntity } from '@interaction/persistence/favorites/favorite.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  eventId: string;

  static fromEntity(favoriteEntity: FavoriteEntity): FavoriteResponse {
    const favoriteResponse = new FavoriteResponse();
    favoriteResponse.id = favoriteEntity.id;
    favoriteResponse.userId = favoriteEntity.userId;
    favoriteResponse.eventId = favoriteEntity.eventId;
    return favoriteResponse;
  }

  static fromDomain(favorite: Favorite): FavoriteResponse {
    const favoriteResponse = new FavoriteResponse();
    favoriteResponse.id = favorite.id;
    favoriteResponse.userId = favorite.userId;
    favoriteResponse.eventId = favorite.eventId;
    return favoriteResponse;
  }
}
