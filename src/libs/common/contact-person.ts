import { ApiProperty } from '@nestjs/swagger';

export class ContactPerson {
  @ApiProperty()
  name: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  responsibility: string;
}
