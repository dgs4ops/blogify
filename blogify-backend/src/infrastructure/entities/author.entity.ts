import { BlogifyBaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'blogify_authors',
})
export class AuthorEntity extends BlogifyBaseEntity {
  @Column({
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  mappedIamId: string;

  @Column({
    type: 'varchar',
  })
  displayName: string;
}
