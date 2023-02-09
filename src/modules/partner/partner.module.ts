import { FileManagerService } from '@libs/common/file-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerEntity } from '@partner/persistence/partner/partner.entity';
import { PartnerController } from '@partner/controllers/partner.controller';
import { PartnerRepository } from '@partner/persistence/partner/partner.repository';
import { PartnerCommands } from '@partner/usecases/partner/partner.usecases.commands';
import { PCategoryController } from './controllers/p-category.controller';
import { PCategoryEntity } from './persistence/p-category/p-category.entity';
import { PCategoryRepository } from './persistence/p-category/p-category.repository';
import { PCategoryCommands } from './usecases/p-category/p-category.usecases.commands';
import { PCategoryQueries } from './usecases/p-category/p-category.usecases.queries';
import { PartnerQueries } from './usecases/partner/partner.usecases.queries';
import { BranchEntity } from './persistence/partner/branch.entity';
@Module({
  controllers: [PartnerController, PCategoryController],
  imports: [
    TypeOrmModule.forFeature([PartnerEntity, PCategoryEntity, BranchEntity]),
  ],
  providers: [
    PartnerRepository,
    PartnerCommands,
    PartnerQueries,
    PCategoryRepository,
    PCategoryCommands,
    PCategoryQueries,
    FileManagerService,
  ],
})
export class PartnerModule {}
