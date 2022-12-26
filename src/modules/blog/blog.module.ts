import { FileManagerService } from '@libs/common/file-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './controllers/blog.controller';
import { BlogEntity } from './persistence/blog/blog.entity';
import { BlogRepository } from './persistence/blog/blog.repository';
import { BlogCommands } from './usecases/blog/blog.usecases.commands';
import { BlogQueries } from './usecases/blog/blog.usecases.queries';
@Module({
  controllers: [BlogController],
  imports: [TypeOrmModule.forFeature([BlogEntity])],
  providers: [BlogRepository, BlogCommands, BlogQueries, FileManagerService],
})
export class BlogModule {}
