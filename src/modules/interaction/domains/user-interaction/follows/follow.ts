export class Follow {
  id: string;
  userId: string;
  branchId: string;

  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
