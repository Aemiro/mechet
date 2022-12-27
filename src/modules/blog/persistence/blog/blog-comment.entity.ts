
import { UserEntity } from '@user/persistence/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogEntity } from './blog.entity';

@Entity({ name: 'blog_comments' })
export class BlogCommentEntity  {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;
  @Column({ type: 'uuid', name: 'blog_id' })
  blogId: string;
  @Column()
  description: string;

  @ManyToOne(() => BlogEntity, (blog) => blog.blogComments, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blog_id' })
  blog: BlogEntity;

  @ManyToOne(() => UserEntity, (user) => user.blogComments, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
