import { FileDto } from '@libs/common/file-dto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogCommentEntity } from './blog-comment.entity';
import { BranchEntity } from '@partner/persistence/partner/branch.entity';
import { CommonEntity } from '@libs/common/common.entity';
import { BlogCategoryEntity } from './blog-category.entity';

@Entity({ name: 'blogs' })
export class BlogEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'branch_id', nullable: true })
  branchId: string;
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

  @OneToMany(() => BlogCategoryEntity, (blogCategory) => blogCategory.blog, {
    cascade: true,
  })
  blogCategories: BlogCategoryEntity[];

  @ManyToOne(() => BranchEntity, (branch) => branch.blogs, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;
}
