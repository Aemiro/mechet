import { Partner } from './partner';

export interface IPartner {
  insert(partner: Partner): Promise<Partner>;
  update(partner: Partner): Promise<Partner>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<Partner[]>;
  getById(id: string, withDeleted: boolean): Promise<Partner>;
  getByPhoneNumber(phoneNumber: string, withDeleted: boolean): Promise<Partner>;
  getByEmail(email: string, withDeleted: boolean): Promise<Partner>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
