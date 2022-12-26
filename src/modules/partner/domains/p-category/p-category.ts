import { PartnerCategory } from '../partner/partner-category';

export class PCategory {
  id: string;
  name: string;
  description: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;
  partnerCategories: PartnerCategory[];

  //partner category
  async addPartnerCategory(createPartnerCategory: PartnerCategory) {
    this.partnerCategories.push(createPartnerCategory);
  }

  async updatePartnerCategory(partnerCategorie: PartnerCategory) {
    const existIndex = this.partnerCategories.findIndex(
      (element) => element.id == partnerCategorie.id,
    );
    this.partnerCategories[existIndex] = partnerCategorie;
  }

  async removePartnerCategory(id: string) {
    this.partnerCategories = this.partnerCategories.filter(
      (element) => element.id != id,
    );
  }

  async updatePartnerCategories(partnerCategories: PartnerCategory[]) {
    this.partnerCategories = partnerCategories;
  }
}
