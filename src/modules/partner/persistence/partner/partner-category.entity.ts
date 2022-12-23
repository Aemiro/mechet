import {
  Index,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';

import { PartnerEntity } from './partner.entity';

@Entity({ name: 'partner_categories' })
export class PartnerCategoryEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;
  @Column({ type: 'uuid', name: 'partner_id' })
  partnerId: string;

  @ManyToOne(() => PartnerEntity, (partner) => partner.partnerCategories, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id' })
  partner: PartnerEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.partnerCategories, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
