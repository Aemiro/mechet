import { Address } from '@libs/common/address';
import { AverageRate } from '@libs/common/average-rate';
import { ContactPerson } from '@libs/common/contact-person';
import { FileDto } from '@libs/common/file-dto';
import { Location } from '@libs/common/location';

export class Branch {
  id: string;
  partnerId: string;
  name: string;
  email: string;
  phoneNumber: string;
  coverImage: FileDto;
  about: string;
  address: Address;
  location: Location;
  isMainBranch: boolean;
  averageRate: AverageRate;
  contactPerson: ContactPerson;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
