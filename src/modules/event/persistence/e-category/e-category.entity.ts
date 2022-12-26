import { FileDto } from '@libs/common/file-dto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventCategoryEntity } from '../event/event-category.entity';
import { CommonEntity } from '@libs/common/common.entity';

@Entity({ name: 'e_categories' })
export class ECategoryEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
  @Column({ name: 'cover_image', type: 'jsonb', nullable: true })
  coverImage: FileDto;

  @OneToMany(
    () => EventCategoryEntity,
    (eventCategory) => eventCategory.eCategory,
    {
      cascade: true,
    },
  )
  eventCategories: EventCategoryEntity[];
}
