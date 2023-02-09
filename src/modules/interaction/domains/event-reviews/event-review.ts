export class EventReview {
  id: string;
  userId: string;
  eventId: string;
  description: string;
  rate: number;

  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
