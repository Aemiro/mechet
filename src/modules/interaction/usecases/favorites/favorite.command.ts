import { Favorite } from '@interaction/domains/favorites/favorite';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteCommand {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  eventId: string;

  static fromCommands(command: CreateFavoriteCommand): Favorite {
    const favorite = new Favorite();
    favorite.userId = command.userId;
    favorite.eventId = command.eventId;
    return favorite;
  }
}

export class UpdateFavoriteCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  eventId: string;

  static fromCommands(command: UpdateFavoriteCommand): Favorite {
    const favorite = new Favorite();
    favorite.id = command.id;
    favorite.userId = command.userId;
    favorite.eventId = command.eventId;
    return favorite;
  }
}
