import { FileDto } from '@libs/common/file-dto';
import { Address } from '@libs/common/address';
import { CommonEntity } from '@libs/common/common.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Index()
  @Column({ nullable: true })
  email: string;
  @Index()
  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;
  @Column()
  gender: string;
  @Column({ name: 'enabled', default: true })
  enabled: boolean;
  @Column({ name: 'profile_image', type: 'jsonb', nullable: true })
  profileImage: FileDto;
  @Column({ type: 'jsonb', nullable: true })
  address: Address;
  @Column({ type: 'simple-array' })
  role: string[];
  @Column()
  password: string;
}
