import { Blog } from '@blog/blog/domains/blog/blog';
import { IBlog } from '@blog/blog/domains/blog/blog.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogEntity } from './blog.entty';

export class BlogRepository implements IBlog {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
  ) {}
  insert(blog: Blog): Promise<Blog> {
    throw new Error('Method not implemented.');
  }
  update(blog: Blog): Promise<Blog> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getAll(withDeleted: boolean): Promise<Blog[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: string, withDeleted: boolean): Promise<Blog> {
    throw new Error('Method not implemented.');
  }
  archive(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  restore(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
