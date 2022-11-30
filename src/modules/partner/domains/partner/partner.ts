import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { Location } from '@libs/common/location';
import { Address } from 'nodemailer/lib/mailer';

export class Partner {
  id: string;
  categoryId: string;
  name: string;
  email: string;
  phoneNumber: string;
  coverImage: FileDto;
  website: string;
  logo: FileDto;
  about: string;
  registrationDate: Date;
  status: string;
  address: Address;
  location: Location;
  averageRate: AverageRate;
}
