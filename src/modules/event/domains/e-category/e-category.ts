import { FileDto } from '@libs/common/file-dto';
import { EventCategory } from '../event/event-category';
export class ECategory {
  id: string;
  name: string;
  description: string;
  coverImage: FileDto;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
  eventCategories: EventCategory[];
}
