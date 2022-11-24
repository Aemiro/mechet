import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { Address } from 'nodemailer/lib/mailer';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'partners' })
export class PartnerEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;
  @Column()
  name: string;
  @Index()
  @Column({ nullable: true })
  email: string;
  @Index()
  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;
  @Column({ name: 'cover_image', type: 'jsonb', nullable: true })
  coverImage: FileDto;
  @Column()
  website: string;
  @Column()
  logo: string;
  @Column()
  about: string;
  @Column({ name: 'registration_date' })
  registrationDate: Date;
  @Column()
  status: string;
  @Column({ type: 'jsonb', nullable: true })
  address: Address;
  @Column({ type: 'jsonb', nullable: true })
  location: Location;
  @Column({ type: 'jsonb', nullable: true, name: 'average_rate' })
  averageRate: AverageRate;
}
