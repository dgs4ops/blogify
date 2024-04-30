import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt_auth.guard';
import { Identity } from '../decorators';
import { ArticleService } from '../../domain/services';
import {
  ArticlesPaginatedResponseDataDto,
  ArticlesPaginatedResponseDto,
  CreateArticleRequestDto,
  FindArticlesQueryDto,
  UpdateArticleRequestDto,
} from './dtos';

@ApiTags('api/v1/articles')
@Controller('api/v1/articles')
export class ArticleController {
  private readonly logger: Logger = new Logger(ArticleController.name);

  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createArticle(
    @Identity() identity: Identity,
    @Body() body: CreateArticleRequestDto,
  ) {
    this.logger.debug('Create article request', { identity, body });
    return this.articleService.createArticle(identity.authorId, body);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateArticle(
    @Identity() identity: Identity,
    @Body() body: UpdateArticleRequestDto,
  ) {
    this.logger.debug('Update article request', { identity, body });
    return this.articleService.updateArticle(identity.authorId, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteArticle(@Identity() identity: Identity, @Param('id') id: string) {
    this.logger.debug('Delete article request', { identity, id });
    return this.articleService.deleteArticle(identity.authorId, id);
  }

  @Get('by-author')
  @ApiResponse({
    type: ArticlesPaginatedResponseDto,
    status: 200,
  })
  @UseGuards(JwtAuthGuard)
  async getArticlesByAuthor(
    @Identity() identity: Identity,
    @Query() query: FindArticlesQueryDto,
  ): Promise<ArticlesPaginatedResponseDto> {
    this.logger.debug('Get articles by author request', { identity, query });
    return this.articleService.paginatedArticles(query, {
      createdBy: identity.authorId,
    });
  }

  @Get()
  @ApiResponse({
    type: ArticlesPaginatedResponseDto,
    status: 200,
  })
  async getArticles(
    @Query() query: FindArticlesQueryDto,
  ): Promise<ArticlesPaginatedResponseDto> {
    this.logger.debug('Get articles request', { query });
    return this.articleService.paginatedArticles(query);
  }

  @Get(':id')
  @ApiResponse({
    type: ArticlesPaginatedResponseDataDto,
    status: 200,
  })
  async getArticleById(
    @Param('id') id: string,
  ): Promise<ArticlesPaginatedResponseDataDto> {
    this.logger.debug('Get article by id request', { id });
    return this.articleService.getArticleById(id);
  }
}
