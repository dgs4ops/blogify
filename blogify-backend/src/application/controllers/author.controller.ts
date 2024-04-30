import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { Identity } from '../decorators';
import { JwtAuthGuard } from '../guards/jwt_auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorService } from '../../domain/services';
import { AuthorMeResponseDto } from './dtos';

@ApiTags('api/v1/authors')
@Controller('api/v1/authors')
export class AuthorController {
  private readonly logger: Logger = new Logger(AuthorController.name);

  constructor(private readonly authorService: AuthorService) {}

  @Get('me')
  @ApiResponse({ type: AuthorMeResponseDto, status: 200 })
  @UseGuards(JwtAuthGuard)
  async getAuthor(
    @Identity() identity: Identity,
  ): Promise<AuthorMeResponseDto> {
    this.logger.debug('Get author request', { identity });
    return this.authorService.getAuthor(identity.mappedIamId);
  }
}
