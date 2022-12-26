import { InjectRepository } from '@nestjs/typeorm';
import { PartnerEntity } from '@partner/persistence/partner/partner.entity';
import { Repository } from 'typeorm';
import { PartnerResponse } from '@partner/usecases/partner/partners.response';
import { NotFoundException } from '@nestjs/common';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { FilterOperators } from '@libs/collection-query/filter_operators';
export class PartnerQueries {
  constructor(
    @InjectRepository(PartnerEntity)
    private partnerRepository: Repository<PartnerEntity>, // @InjectRepository(ScheduleEntity)
  ) // private scheduleRepository: Repository<ScheduleEntity>,
  {}

  async getPartner(id: string, withDeleted = false): Promise<PartnerResponse> {
    const partner = await this.partnerRepository.find({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    console.log('partner', partner);
    if (!partner[0]) {
      throw new NotFoundException(`Partner not found with id ${id}`);
    }
    return PartnerResponse.fromEntity(partner[0]);
  }

  async getPartners(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<PartnerResponse>> {
    const dataQuery = QueryConstructor.constructQuery<PartnerEntity>(
      this.partnerRepository,
      query,
    );
    const d = new DataResponseFormat<PartnerResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => PartnerResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }

  async getArchivedPartners(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<PartnerResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<PartnerEntity>(
      this.partnerRepository,
      query,
    );
    dataQuery.withDeleted();
    const d = new DataResponseFormat<PartnerResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => PartnerResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }

  // async getSchedulesByBranchId(
  //   branchId: string,
  //   query: CollectionQuery,
  // ): Promise<DataResponseFormat<ScheduleResponse>> {
  //   try {
  //     if (!query.filter) {
  //       query.filter = [];
  //     }
  //     query.filter.push([
  //       {
  //         field: 'branch_id',
  //         operator: FilterOperators.EqualTo,
  //         value: branchId,
  //       },
  //     ]);
  //     const dataQuery = QueryConstructor.constructQuery<ScheduleEntity>(
  //       this.scheduleRepository,
  //       query,
  //     );
  //     console.log(dataQuery.getSql(), dataQuery.getParameters());
  //     const d = new DataResponseFormat<ScheduleResponse>();
  //     if (query.count) {
  //       d.count = await dataQuery.getCount();
  //     } else {
  //       const [result, total] = await dataQuery.getManyAndCount();
  //       d.data = result.map((entity) => ScheduleResponse.fromEntity(entity));
  //       d.count = total;
  //     }
  //     return d;
  //   } catch (error) {
  //     throw new BadRequestException(error.code, error.message);
  //   }
  // }
}
