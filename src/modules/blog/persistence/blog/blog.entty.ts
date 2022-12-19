import { FileDto } from '@libs/common/file-dto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogCategoryEntity } from '../category/category.entity';
import { BlogCommentEntity } from './blog-comment.entity';
import { BranchEntity } from '@partner/persistence/partner/branch.entity';

@Entity({ name: 'blogs' })
export class BlogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'branch_id' })
  branchId: string;
  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  views: number;
  @Column({ name: 'cover_image', type: 'jsonb', nullable: true })
  coverImage: FileDto;
  @Column({ name: 'is_published', nullable: true })
  isPublished: boolean;
  @Column({ name: 'published_date' })
  publishedDate: Date;
  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @OneToMany(() => BlogCommentEntity, (blogComment) => blogComment.blog, {
    cascade: true,
  })
  blogComments: BlogCommentEntity[];

  @ManyToOne(() => BlogCategoryEntity, (blogCategory) => blogCategory.blogs, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  blogCategory: BlogCategoryEntity;

  @ManyToOne(() => BlogCategoryEntity, (branch) => branch.blogs, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;
}
