import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthorService, FirebaseAdminService } from '../../domain/services';
import { IDENTITY_HEADER_NAME } from '../decorators';
import { Equal } from 'typeorm';
import { AuthorEntity } from '../../infrastructure/entities';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly authorService: AuthorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return false;
    }
    const [type, token] = request.headers.authorization.split(' ');

    if (!type || (type && type !== 'Bearer')) {
      throw new UnauthorizedException('Unknown or unsupported token type');
    }
    const decodedToken = await this.firebaseAdminService.getDecodedToken(token);

    if (!decodedToken) {
      return false;
    }
    const author: AuthorEntity = await this.authorService.repository.findOneBy({
      mappedIamId: Equal(decodedToken.uid),
    });

    if (!author) {
      return false;
    }

    request.body[IDENTITY_HEADER_NAME] = {
      mappedIamId: decodedToken.uid,
      authorId: author.id,
    };
    return true;
  }
}
