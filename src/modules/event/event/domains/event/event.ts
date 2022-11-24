import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { Location } from '@libs/common/location';
import { Address } from 'nodemailer/lib/mailer';
export class Event {
  id: string;
  title: string;
  description: string;
  views: number;
  coverImage: FileDto;
  isPublished: boolean;
  publishedDate: Date;
  from: string;
  to: string;
  averageRate: AverageRate;
  address: Address;
  location: Location;
  categoryId: string;
}
