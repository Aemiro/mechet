import { CollectionQuery } from '@libs/collection-query/collection-query';
import { ApiPaginatedResponse } from '@libs/response-format/api-paginated-response';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiExtraModels,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  CreateBranchCommand,
  UpdateBranchCommand,
} from '@partner/usecases/partner/branch.commands';
import { BranchResponse } from '@partner/usecases/partner/branch.response';
import {
  CreatePartnerCommand,
  UpdatePartnerCommand,
} from '@partner/usecases/partner/partner.commands';
import { PartnerCommands } from '@partner/usecases/partner/partner.usecases.commands';
import { PartnerQueries } from '@partner/usecases/partner/partner.usecases.queries';
import { PartnerResponse } from '@partner/usecases/partner/partners.response';

@Controller('partners')
@ApiTags('partners')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class PartnerController {
  constructor(
    private commands: PartnerCommands,
    private queries: PartnerQueries,
  ) {}

  @Get('get-partner/:id')
  @ApiOkResponse({ type: PartnerResponse })
  async getPartner(@Param('id') id: string) {
    return this.queries.getPartner(id);
  }

  // @Get('get-archived-partner/:id')
  // @ApiOkResponse({ type: PartnerResponse })
  // async getArchivedPartner(@Param('id') id: string) {
  //   return this.queries.getPartner(id, true);
  // }

  @Get('get-archived-partners')
  @ApiPaginatedResponse(PartnerResponse)
  async getArchivedPartners(@Query() query: CollectionQuery) {
    return this.queries.getArchivedPartners(query);
  }

  @Get('get-partners')
  @ApiPaginatedResponse(PartnerResponse)
  async getPartners(@Query() query: CollectionQuery) {
    return this.queries.getPartners(query);
  }

  @Post('create-partner')
  @ApiOkResponse({ type: PartnerResponse })
  async createPartner(@Body() createPartnerCommand: CreatePartnerCommand) {
    return await this.commands.createPartner(createPartnerCommand);
  }

  @Put('updated-partner')
  @ApiOkResponse({ type: PartnerResponse })
  async updatePartner(@Body() updatePartnerCommand: UpdatePartnerCommand) {
    return await this.commands.updatePartner(updatePartnerCommand);
  }

  @Delete('archive-partner/:id')
  @ApiOkResponse({ type: Boolean })
  async archivePartner(@Param('id') id: string) {
    return await this.commands.archivePartner(id);
  }
  @Delete('delete-partner/:id')
  @ApiOkResponse({ type: Boolean })
  async deletePartner(@Param('id') id: string) {
    return this.commands.deletePartner(id);
  }
  @Post('restore-partner/:id')
  @ApiOkResponse({ type: PartnerResponse })
  async restorePartner(@Param('id') id: string) {
    return await this.commands.restorePartner(id);
  }

  @Post('create_branch')
  @ApiOkResponse({ type: BranchResponse })
  async createBranch(@Body() command: CreateBranchCommand) {
    return await this.commands.createBranch(command);
  }

  @Put('update_branch')
  @ApiOkResponse({ type: BranchResponse })
  async updateBranch(@Body() command: UpdateBranchCommand) {
    return await this.commands.updateBranch(command);
  }
  @Delete('delete-branch/:id')
  @ApiOkResponse({ type: Boolean })
  async removeBranch(@Param('id') id: string) {
    return this.commands.removeBranch(id);
  }

  @Get('get-branchs/:partnerId')
  @ApiPaginatedResponse(PartnerResponse)
  async getBranchs(
    @Param('partnerId') partnerId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.queries.getBranchsByPartner(partnerId, query);
  }
  // @Get('get-schedule-by-branch/:branchId')
  // @ApiPaginatedResponse(ScheduleResponse)
  // async getSchedulesByBranchId(
  //   @Query('branchId') branchId: string,
  //   @Query() query: CollectionQuery,
  // ) {
  //   return this.queries.getSchedulesByBranchId(branchId, query);
  // }

  // @Post('create_schedule-by-branch/:branchId')
  // @ApiOkResponse({ type: ScheduleResponse })
  // async createScheduleByBranchId(
  //   @Param('branchId') branchId: string,
  //   @Body() command: CreateScheduleCommand,
  // ) {
  //   return await this.commands.createScheduleByBranchId(branchId, command);
  // }

  // @Put('update_schedule-by-branch/:branchId')
  // @ApiOkResponse({ type: ScheduleResponse })
  // async updateScheduleByBranchId(
  //   @Param('branchId') branchId: string,
  //   @Body() command: UpdateScheduleCommand,
  // ) {
  //   return await this.commands.updateScheduleByBranchId(branchId, command);
  // }

  // @Delete('remove-schedule-by-branch/:id')
  // @ApiOkResponse({ type: Boolean })
  // async removeScheduleByBranchId(
  //   @Param('branchId') branchId: string,
  //   @Param() id: string,
  // ) {
  //   return await this.commands.removeScheduleByBranchId(branchId, id);
  // }
}
