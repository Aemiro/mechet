import { Follow } from '@interaction/domains/user-interaction/follows/follow';
import { FileDto } from '@libs/common/file-dto';
import { Schedule } from './schedule';
import { PartnerCategory } from './partner-category';
import { Branch } from './branch';
import { ContactPerson } from '@libs/common/contact-person';
import { Status } from '@libs/common/enums';

export class Partner {
  id: string;
  categoryId: string;
  name: string;
  email: string;
  phoneNumber: string;
  website: string;
  logo: FileDto;
  about: string;
  status: Status;
  contactPerson: ContactPerson;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
  branches: Branch[];
  follows: Follow[];
  // partnerReviews: PartnerReview[];
  partnerCategories: PartnerCategory[];

  //branch
  async addBanch(createBranch: Branch) {
    this.branches.push(createBranch);
  }

  async updateBranch(branch: Branch) {
    const existIndex = this.branches.findIndex(
      (element) => element.id == branch.id,
    );
    this.branches[existIndex] = branch;
  }

  async removeBranch(id: string) {
    this.branches = this.branches.filter((element) => element.id != id);
  }

  async updateBranches(branches: Branch[]) {
    this.branches = branches;
  }

  //partner category
  async addPartnerCategory(createPartnerCategory: PartnerCategory) {
    this.partnerCategories.push(createPartnerCategory);
  }

  async updatePartnerCategory(partnerCategory: PartnerCategory) {
    const existIndex = this.partnerCategories.findIndex(
      (element) => element.id == partnerCategory.id,
    );
    this.partnerCategories[existIndex] = partnerCategory;
  }

  async removePartnerCategory(id: string) {
    this.partnerCategories = this.partnerCategories.filter(
      (element) => element.id != id,
    );
  }

  async updatePartnerCategories(partnerCategories: PartnerCategory[]) {
    this.partnerCategories = partnerCategories;
  }

  //follow
  async addFollow(createFollow: Follow) {
    this.follows.push(createFollow);
  }

  async updateFollow(follow: Follow) {
    const existIndex = this.follows.findIndex(
      (element) => element.id == follow.id,
    );
    this.follows[existIndex] = follow;
  }

  async removeFollow(id: string) {
    this.follows = this.follows.filter((element) => element.id != id);
  }

  async updateFollows(follows: Follow[]) {
    this.follows = follows;
  }
  // //partner review
  // async addPartnerReview(createPartnerReview: PartnerReview) {
  //   this.partnerReviews.push(createPartnerReview);
  // }

  // async updatePartnerReview(partnerReview: PartnerReview) {
  //   const existIndex = this.partnerReviews.findIndex(
  //     (element) => element.id == partnerReview.id,
  //   );
  //   this.follows[existIndex] = partnerReview;
  // }

  // async removePartnerReview(id: string) {
  //   this.partnerReviews = this.partnerReviews.filter(
  //     (element) => element.id != id,
  //   );
  // }

  // async updatePartnerReviews(partnerReviews: PartnerReview[]) {
  //   this.partnerReviews = partnerReviews;
  // }
}
