import {
  FileManagerHelper,
  FileManagerService,
} from '@libs/common/file-manager';
import { Utility } from '@libs/common/utility';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PartnerRepository } from '@partner/persistence/partner/partner.repository';
import { CreatePartnerCommand, UpdatePartnerCommand } from './partner.commands';
import { PartnerResponse } from './partners.response';

export class PartnerCommands {
  constructor(
    private partnerRepository: PartnerRepository,

    private readonly fileManagerService: FileManagerService,
  ) {}

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
    const partnerDomain = CreatePartnerCommand.fromCommands(command);

    console.log(partnerDomain);
    partnerDomain.password = Utility.hashPassword(command.password);
    const partner = await this.partnerRepository.insert(partnerDomain);
    return PartnerResponse.fromDomain(partner);
  }

  async updatePartner(
    id: string,
    command: UpdatePartnerCommand,
  ): Promise<PartnerResponse> {
    const partner = await this.partnerRepository.getById(command.id);
    if (partner != null) {
      const partner = UpdatePartnerCommand.fromCommands(command);
      const result = await this.partnerRepository.update(id, partner);
      return PartnerResponse.fromDomain(result);
    }
    throw new NotFoundException(`Partner not found with id ${command.id}`);
  }

  async deletePartner(id: string): Promise<boolean> {
    const partner = await this.partnerRepository.getById(id, true);
    if (!partner) {
      throw new NotFoundException(`partner not found with id ${id}`);
    }
    const result = await this.partnerRepository.delete(id);
    if (result) {
      if (partner.coverImage) {
        await this.fileManagerService.removeFile(
          partner.coverImage,
          FileManagerHelper.UPLOADED_FILES_DESTINATION,
        );
      }
    }
    return result;
  }

  async archivePartner(id: string): Promise<boolean> {
    const partner = await this.partnerRepository.getById(id, true);
    if (!partner) {
      throw new NotFoundException(`partner not found with id ${id}`);
    }
    return await this.partnerRepository.archive(id);
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
}
