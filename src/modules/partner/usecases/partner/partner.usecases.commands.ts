import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartnerCommand, UpdatePartnerCommand } from './partner.commands';
import { PartnerResponse } from './partners.response';
import { Partner } from '@partner/domains/partner/partner';
import { CreateBranchCommand } from './branch.commands';
import { Branch } from '@partner/domains/partner/branch';
import { PartnerRepository } from '@partner/persistence/partner/partner.repository';
import { BranchResponse } from '@partner/usecases/partner/branch.response';

@Injectable()
export class PartnerCommands {
  private partnerDomain = new Partner();
  private branchDomain = new Branch();
  constructor(private partnerRepository: PartnerRepository) {}

  async createPartner(command: CreatePartnerCommand): Promise<PartnerResponse> {
    if (
      await this.partnerRepository.getByPhoneNumber(command.phoneNumber, true)
    ) {
      throw new BadRequestException(
        `Partner already exist with this phone number`,
      );
    }
    if (
      command.email &&
      (await this.partnerRepository.getByEmail(command.email, true))
    ) {
      throw new BadRequestException(
        `Partner already exist with this email Address`,
      );
    }
    this.partnerDomain = CreatePartnerCommand.fromCommands(command);

    console.log(this.partnerDomain);
    const partner = await this.partnerRepository.insert(this.partnerDomain);
    return PartnerResponse.fromDomain(partner);
  }

  async updatePartner(command: UpdatePartnerCommand): Promise<PartnerResponse> {
    const partner = await this.partnerRepository.getById(command.id);
    if (partner != null) {
      const partner = UpdatePartnerCommand.fromCommands(command);
      const result = await this.partnerRepository.update(partner);
      return PartnerResponse.fromDomain(result);
    }
    throw new NotFoundException(`Partner not found with id ${command.id}`);
  }

  async archivePartner(id: string): Promise<boolean> {
    const partner = await this.partnerRepository.getById(id, true);
    if (!partner) {
      throw new NotFoundException(`partner not found with id ${id}`);
    }
    return await this.partnerRepository.archive(id);
  }

  async deletePartner(id: string): Promise<boolean> {
    const partner = await this.partnerRepository.getById(id, true);
    if (!partner) {
      throw new NotFoundException(`partner not found with id ${id}`);
    }
    const result = await this.partnerRepository.delete(id);

    return result;
  }

  async restorePartner(id: string): Promise<PartnerResponse> {
    const partner = await this.partnerRepository.getById(id, true);
    if (!partner) {
      throw new NotFoundException(`partner not found with id ${id}`);
    }
    const result = await this.partnerRepository.restore(id);

    if (result) {
      partner.deletedAt = null;
    }
    return PartnerResponse.fromDomain(partner);
  }

  async createBranch(
    partnerId: string,
    createBranchCommand: CreateBranchCommand,
  ): Promise<BranchResponse> {
    let branchDomain = new Branch();
    this.partnerDomain = await this.partnerRepository.getById(partnerId);
    if (this.partnerDomain) {
      if (
        await this.partnerRepository.getByPhoneNumber(
          createBranchCommand.phoneNumber,
          true,
        )
      ) {
        throw new BadRequestException(
          `branch already exist with this phone number`,
        );
      }
      if (
        createBranchCommand.email &&
        (await this.partnerRepository.getByEmail(
          createBranchCommand.email,
          true,
        ))
      ) {
        throw new BadRequestException(
          `branch already exist with this email Address`,
        );
      }
      branchDomain = CreateBranchCommand.fromCommands(createBranchCommand);
      if (!this.partnerDomain) {
        this.partnerDomain.branches = [];
      }
      this.partnerDomain.addBanch(branchDomain);
      const result = await this.partnerRepository.update(this.partnerDomain);
      if (result) {
        return BranchResponse.fromDomain(
          result.branches[result.branches.length - 1],
        );
      }
      return null;
    }
  }

  // // async updateBranchCoverImage(id: string, fileDto: FileResponseDto) {
  // //   const partnerDomain = await this.partnerRepository.getById(id, true);
  // //   if (!partnerDomain) {
  // //     throw new NotFoundException(`User not found with id ${id}`);
  // //   }
  // //   if (partnerDomain.coverImage && fileDto) {
  // //     await this.fileManagerService.removeFile(
  // //       partnerDomain.profileImage,
  // //       FileManagerHelper.UPLOADED_FILES_DESTINATION,
  // //     );
  // //   }
  // //   partnerDomain.coverImage = fileDto as FileDto;
  // //   const result = await this.partnerRepository.update(id, partnerDomain);
  // //   return BranchResponse.fromDomain(result);
  // }

  // async createScheduleByBranchId(
  //   branchId: string,
  //   createScheduleCommand: CreateScheduleCommand,
  // ): Promise<ScheduleResponse> {
  //   let scheduleDomain = new Schedule();
  //   this.partnerDomain = await this.partnerRepository.getById(branchId);
  //   if (this.branchDomain) {
  //     scheduleDomain = CreateScheduleCommand.fromCommands(
  //       createScheduleCommand,
  //     );
  //     if (!this.branchDomain) {
  //       this.branchDomain.schedules = [];
  //     }
  //     this.branchDomain.addSchedule(scheduleDomain);
  //     const result = await this.partnerRepository.update(
  //       branchId,
  //       this.partnerDomain,
  //     );
  //     if (result) {
  //       return ScheduleResponse.fromDomain(
  //         result.schedules[result.schedules.length - 1],
  //       );
  //     }
  //   }
  //   return null;
  // }

  // async updateScheduleByBranchId(
  //   branchId: string,
  //   updateScheduleCommand: UpdateScheduleCommand,
  // ): Promise<ScheduleResponse> {
  //   const schedule = UpdateScheduleCommand.fromCommands(updateScheduleCommand);
  //   this.partnerDomain = await this.partnerRepository.getById(branchId);
  //   this.partnerDomain.updateSchedule(schedule);
  //   const result = await this.partnerRepository.update(
  //     branchId,
  //     this.partnerDomain,
  //   );
  //   const single = result.schedules.filter(
  //     (row) => row.id == updateScheduleCommand.id,
  //   );
  //   return ScheduleResponse.fromDomain(single[0]);
  // }
  // async removeScheduleByBranchId(
  //   branchId: string,
  //   id: string,
  // ): Promise<boolean> {
  //   const schedule = await this.partnerRepository.getById(branchId);
  //   if (schedule) {
  //     await schedule.removeSchedule(id);
  //     const result = await this.partnerRepository.update(branchId, schedule);
  //     if (result) return true;
  //   }
  //   return false;
  // }
}
