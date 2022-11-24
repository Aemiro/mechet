import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longtitude: number;
  @ApiProperty()
  landmark: string;
}
