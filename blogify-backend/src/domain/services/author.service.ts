import { Injectable, NotFoundException } from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
import { AuthorEntity } from '../../infrastructure/entities';
import { pick } from '../../utils';
import { AuthorMeResponseDto } from '../../application/controllers/dtos';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,
  ) {}

  get repository(): Repository<AuthorEntity> {
    return this.authorRepository;
  }

  async getAuthor(mappedIamId: string): Promise<AuthorMeResponseDto> {
    const author: AuthorEntity = await this.authorRepository.findOneBy({
      mappedIamId: Equal(mappedIamId),
    });

    if (!author) {
      throw new NotFoundException(`Author with id '${mappedIamId} not found.'`);
    }
    return {
      meta: undefined,
      data: pick(author, 'id', 'displayName', 'createdAt', 'updatedAt'),
    };
  }
}
