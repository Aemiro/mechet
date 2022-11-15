import { ApiProperty } from '@nestjs/swagger';

export class AverageRate {
  @ApiProperty()
  rate: number;
  @ApiProperty()
  totalReviews: number;
}
