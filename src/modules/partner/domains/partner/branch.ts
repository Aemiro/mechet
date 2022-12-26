import { Address } from '@libs/common/address';
import { AverageRate } from '@libs/common/average-rate';
import { ContactPerson } from '@libs/common/contact-person';
import { FileDto } from '@libs/common/file-dto';
import { Location } from '@libs/common/location';
import { BranchReview } from '@interaction/domains/user-interaction/branch-reviews/branch-review';
import { Follow } from '@interaction/domains/user-interaction/follows/follow';
import { Schedule } from '@partner/domains/partner/schedule';

export class Branch {
  id: string;
  partnerId: string;
  name: string;
  email: string;
  phoneNumber: string;
  coverImage: FileDto;
  about: string;
  address: Address;
  location: Location;
  isMainBranch: boolean;
  averageRate: AverageRate;
  contactPerson: ContactPerson;
  branchReviews: BranchReview[];
  schedules: Schedule[];
  follows: Follow[];
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deletedBy?: string;

  //schedule
  async addSchedule(createSchedule: Schedule) {
    this.schedules.push(createSchedule);
  }

  async updateSchedule(schedule: Schedule) {
    const existIndex = this.schedules.findIndex(
      (element) => element.id == schedule.id,
    );
    this.schedules[existIndex] = schedule;
  }

  async removeSchedule(id: string) {
    this.schedules = this.schedules.filter((element) => element.id != id);
  }

  async updateSchedules(schedules: Schedule[]) {
    this.schedules = schedules;
  }
}
