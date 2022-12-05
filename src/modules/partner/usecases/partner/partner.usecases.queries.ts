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
    private partnerRepository: Repository<PartnerEntity>,
  ) {}

  async getPartner(id: string, withDeleted = false): Promise<PartnerResponse> {
    const partner = await this.partnerRepository.find({
      where: { id: id },
      relations: [
        'schedules',
        'follows',
        'partner_reviews',
        'partner_categories',
      ],
      withDeleted: withDeleted,
    });
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
    // console.log(dataQuery.getSql(), dataQuery.getParameters());
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
}
