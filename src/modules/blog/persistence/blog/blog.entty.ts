import { FileDto } from '@libs/common/file-dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'blogs' })
export class BlogEntity {
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
  @Column({ type: 'simple-array' })
  tags: string[];
}
