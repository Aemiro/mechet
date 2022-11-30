import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from '../../domains/partner/partner';
import { IPartner } from './../../domains/partner/partner.repository.interface';
import { PartnerEntity } from './partner.entity';
export class PartnerRepository implements IPartner {
  constructor(
    @InjectRepository(PartnerEntity)
    private partnerRepository: Repository<PartnerEntity>,
  ) {}
  insert(partner: Partner): Promise<Partner> {
    throw new Error('Method not implemented.');
  }
  update(partner: Partner): Promise<Partner> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getAll(withDeleted: boolean): Promise<Partner[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: string, withDeleted: boolean): Promise<Partner> {
    throw new Error('Method not implemented.');
  }
  getByPhoneNumber(
    phoneNumber: string,
    withDeleted: boolean,
  ): Promise<Partner> {
    throw new Error('Method not implemented.');
  }
  getByEmail(email: string, withDeleted: boolean): Promise<Partner> {
    throw new Error('Method not implemented.');
  }
  archive(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  // toPartner(partnerEntity: PartnerEntity): Partner {
  //   const partner: Partner = new Partner();
  //   partner.id = partnerEntity.id;
  //   partner.categoryId = partnerEntity.categoryId;
  //   partner.name = partnerEntity.name;
  //   partner.email = partnerEntity.email;
  //   partner.phoneNumber = partnerEntity.phoneNumber;
  //   partner.coverImage = partnerEntity.coverImage;
  //   partner.website = partnerEntity.website;
  //   partner.logo = partnerEntity.logo;
  //   partner.about = partnerEntity.about;
  //   partner.registrationDate = partnerEntity.registrationDate;
  //   partner.status = partnerEntity.status;
  //   partner.address = partnerEntity.address;
  //   partner.location = partnerEntity.location;
  //   partner.averageRate = partnerEntity.averageRate;
  // }
}
