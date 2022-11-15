import { FileDto } from '@libs/common/file-dto';
import { Address } from '@libs/common/address';
export class User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  password: string;
  enabled: boolean;
  profileImage: FileDto;
  address: Address;
  role: string[];
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
