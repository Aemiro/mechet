import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PartnerCategoryEntity } from './partner-category.entity';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;

  @OneToMany(
    () => PartnerCategoryEntity,
    (partnerCategory) => partnerCategory.category,
    {
      cascade: true,
    },
  )
  partnerCategories: PartnerCategoryEntity[];
}
