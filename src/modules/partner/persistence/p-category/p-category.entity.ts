import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PartnerCategoryEntity } from '@partner/persistence/partner/partner-category.entity';
import { CommonEntity } from '@libs/common/common.entity';

@Entity({ name: 'p_categories' })
export class PCategoryEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;

  @OneToMany(
    () => PartnerCategoryEntity,
    (partnerCategory) => partnerCategory.pCategory,
    {
      cascade: true,
    },
  )
  partnerCategories: PartnerCategoryEntity[];
}
