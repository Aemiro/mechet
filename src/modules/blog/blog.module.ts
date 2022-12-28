import { FileManagerService } from '@libs/common/file-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BCategoryController } from './controllers/b-category.controller';
import { BlogController } from './controllers/blog.controller';
import { BCategoryEntity } from './persistence/b-category/b-category.entity';
import { BCategoryRepository } from './persistence/b-category/b-category.repository';
import { BlogEntity } from './persistence/blog/blog.entity';
import { BlogRepository } from './persistence/blog/blog.repository';
import { BCategoryQueries } from './usecases/b-category/b-category.usecase.queries';
import { BCategoryCommands } from './usecases/b-category/b-category.usecases.commands';
import { BlogCommands } from './usecases/blog/blog.usecases.commands';
import { BlogQueries } from './usecases/blog/blog.usecases.queries';
@Module({
  controllers: [BlogController, BCategoryController],
  imports: [TypeOrmModule.forFeature([BlogEntity, BCategoryEntity])],
  providers: [
    BlogRepository,
    BlogCommands,
    BlogQueries,
    FileManagerService,
    BCategoryRepository,
    BCategoryCommands,
    BCategoryQueries,
  ],
})
export class BlogModule {}
