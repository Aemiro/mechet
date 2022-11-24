import { AverageRate } from '@libs/common/average-rate';
import { FileDto } from '@libs/common/file-dto';
import { Address } from 'nodemailer/lib/mailer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'events' })
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  views: number;
  @Column({ name: 'cover_image', type: 'jsonb', nullable: true })
  coverImage: FileDto;
  @Column({ name: 'is_published' })
  isPublished: boolean;
  @Column({ name: 'published_date' })
  publishedDate: Date;
  @Column()
  from: string;
  @Column()
  to: string;
  @Column({ name: 'average_rate' })
  averageRate: AverageRate;
  @Column()
  address: Address;
  @Column()
  location: Location;
}
