export class BranchReview {
  id: string;
  branchId: string;
  userId: string;
  description: string;
  rate: number;

  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
