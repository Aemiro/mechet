import { CommonEntity } from '@libs/common/common.entity';
import { FileDto } from '@libs/common/file-dto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogCategoryEntity } from '../blog/blog-category.entity';

@Entity({ name: 'b_categories' })
export class BCategoryEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
  @Column({ name: 'cover_image', type: 'jsonb', nullable: true })
  coverImage: FileDto;
  @OneToMany(
    () => BlogCategoryEntity,
    (blogCategory) => blogCategory.bCategory,
    {
      cascade: true,
    },
  )
  blogCategories: BlogCategoryEntity[];
}
