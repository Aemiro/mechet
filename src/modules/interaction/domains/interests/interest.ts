export class Interest {
  id: string;
  userId: string;
  eventId: string;

  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
