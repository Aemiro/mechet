import { FileDto } from '@libs/common/file-dto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from '../blog/blog.entity';

@Entity({ name: 'b_categories' })
export class BCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
  @Column({ name: 'cover_image', type: 'jsonb', nullable: true })
  coverImage: FileDto;

  @OneToMany(() => BlogEntity, (blog) => blog.bCategory, {
    cascade: true,
  })
  blogs: BlogEntity[];
}
