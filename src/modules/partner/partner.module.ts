import { FileManagerService } from '@libs/common/file-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerEntity } from '@partner/persistence/partner/partner.entity';
import { PartnerController } from '@partner/controllers/partner.controller';
import { PartnerRepository } from '@partner/persistence/partner/partner.repository';
import { PartnerCommands } from '@partner/usecases/partner/partner.usecases.commands';
import { CategoryEntity } from '@partner/persistence/category/category.entity';
import { PartnerQueries } from '@partner/usecases/partner/partner.usecases.queries';
import { CategoryCommands } from '@partner/usecases/category/category.usecases.commands';
import { CategoryQueries } from '@partner/usecases/category/category.usecases.queries';
import { CategoryController } from '@partner/controllers/category.controller';
@Module({
  controllers: [PartnerController, CategoryController],
  imports: [TypeOrmModule.forFeature([PartnerEntity, CategoryEntity])],
  providers: [
    PartnerRepository,
    PartnerCommands,
    PartnerQueries,
    CategoryCommands,
    CategoryQueries,
    FileManagerService,
  ],
})
export class PartnerrModule {}
