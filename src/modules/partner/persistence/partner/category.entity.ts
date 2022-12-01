import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categorys' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
}
