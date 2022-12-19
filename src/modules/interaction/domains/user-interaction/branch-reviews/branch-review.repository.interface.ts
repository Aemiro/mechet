import { BranchReview } from './branch-review';

export interface IBranchReview {
  insert(branchReview: BranchReview): Promise<BranchReview>;
  update(id: string, branchReview: BranchReview): Promise<BranchReview>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<BranchReview[]>;
  getById(id: string, withDeleted: boolean): Promise<BranchReview>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
