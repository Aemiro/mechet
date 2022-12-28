import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BCategoryEntity } from '../b-category/b-category.entity';
import { BlogEntity } from './blog.entity';

@Entity({ name: 'blog-categories' })
export class BlogCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'blog_id' })
  blogId: string;
  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => BlogEntity, (blog) => blog.blogCategories, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blog_id' })
  blog: BlogEntity;

  @ManyToOne(() => BCategoryEntity, (bCategory) => bCategory.blogCategories, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  bCategory: BCategoryEntity;
}
