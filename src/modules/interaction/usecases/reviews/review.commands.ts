import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Review } from '@interaction/domains/reviews/review';

export class CreateReviewCommand {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  score: number;
  @ApiProperty({
    example: '1ab63a0f-7e18-46d9-af97-ff3dbc88c151',
  })
  @IsUUID()
  partnerId: string;
  @ApiProperty()
  description: string;
  static fromCommand(command: CreateReviewCommand): Review {
    const reviewDomain = new Review();
    reviewDomain.score = command.score;
    reviewDomain.partnerId = command.partnerId;
    reviewDomain.description = command.description;
    return reviewDomain;
  }
}
