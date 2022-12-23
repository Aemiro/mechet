export class EventComment {
  id: string;
  userId: string;
  eventId: string;
  description: string;

  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
