import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Feedback } from '@interaction/domains/feedbacks/feedback';

export class CreateFeedbackCommand {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'someone@gmail.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '+251911111111',
  })
  @IsNotEmpty()
  phoneNumber: string;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  description: string;
  static fromCommand(command: CreateFeedbackCommand): Feedback {
    const feedbackDomain = new Feedback();
    feedbackDomain.name = command.name;
    feedbackDomain.email = command.email;
    feedbackDomain.phoneNumber = command.phoneNumber;
    feedbackDomain.subject = command.subject;
    feedbackDomain.description = command.description;
    return feedbackDomain;
  }
}
