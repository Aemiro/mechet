import { FileManagerService } from '@libs/common/file-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerController } from './controllers/partner.controller';
import { PartnerEntity } from './persistence/partner/partner.entity';
import { PartnerRepository } from './persistence/partner/partner.repository';
import { PartnerCommands } from './usecases/partner/partner.usecases.commands';
import { PartnerQueries } from './usecases/partner/partner.usecases.queries';
@Module({
  controllers: [PartnerController],
  imports: [TypeOrmModule.forFeature([PartnerEntity])],
  providers: [
    PartnerRepository,
    PartnerCommands,
    PartnerQueries,
    FileManagerService,
  ],
})
export class PartnerrModule {}
