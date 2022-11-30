import { FileDto } from '@libs/common/file-dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'event_categories' })
export class EventCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
  @Column({ name: 'cover_image', type: 'jsonb', nullable: true })
  coverImage: FileDto;
}
