export class Feedback {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  subject: string;
  description: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
