import { Column, Entity } from 'typeorm';
import { BlogifyBaseEntity } from './base.entity';

@Entity({
  name: 'blogify_articles',
})
export class ArticleEntity extends BlogifyBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  createdBy: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  updatedBy: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 64,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 128,
  })
  introduction: string;
}
