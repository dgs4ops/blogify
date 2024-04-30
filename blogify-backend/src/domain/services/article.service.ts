import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Equal, FindOptionsWhere, Repository } from 'typeorm';
import { ArticleEntity, AuthorEntity } from '../../infrastructure/entities';
import { pick } from '../../utils';
import {
  ArticlesPaginatedResponseDataDto,
  ArticlesPaginatedResponseDto,
} from '../../application/controllers/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorService } from './author.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    private readonly authorService: AuthorService,
  ) {}

  async createArticle(authorId: string, body: any) {
    const author: AuthorEntity = await this.authorService.repository.findOneBy({
      id: Equal(authorId),
    });

    if (!author) {
      throw new NotFoundException(
        `Associated author with '${authorId}' does not exist.`,
      );
    }
    return this.articleRepository
      .save(
        this.articleRepository.create({
          createdBy: authorId,
          title: body.title,
          introduction: body.introduction,
          content: body.content,
        }),
      )
      .then(() => HttpStatus.OK);
  }

  async updateArticle(authorId: string, body: any) {
    const article: ArticleEntity = await this.articleRepository.findOneBy({
      id: Equal(body.id),
    });

    if (!article) {
      throw new NotFoundException(`Article with id '${body.id}' not found`);
    }
    if (article.createdBy != authorId) {
      throw new ForbiddenException(
        `Author with id '${authorId}' are not allowed to edit article with id '${article.id}'.`,
      );
    }
    const { title, introduction, content } = body;

    if (title) {
      article.title = title;
    }

    if (introduction) {
      article.introduction = introduction;
    }

    if (content) {
      article.content = content;
    }
    return this.articleRepository.save(article).then(() => HttpStatus.OK);
  }

  async deleteArticle(authorId: string, articleId: string) {
    const article: ArticleEntity = await this.articleRepository.findOneBy({
      createdBy: Equal(authorId),
      id: Equal(articleId),
    });
    if (!article) {
      throw new NotFoundException(
        `Article with id '${articleId}' does not exist.`,
      );
    }
    return this.articleRepository
      .delete({ id: Equal(article.id) })
      .then(() => HttpStatus.OK);
  }

  async getArticleById(
    articleId: string,
  ): Promise<ArticlesPaginatedResponseDataDto> {
    const article: ArticleEntity = await this.articleRepository.findOneBy({
      id: Equal(articleId),
    });
    if (!article) {
      throw new NotFoundException(
        `Article with id '${articleId}' does not exist.`,
      );
    }
    const author: AuthorEntity = await this.authorService.repository.findOneBy({
      id: Equal(article.createdBy),
    });

    if (!author) {
      throw new NotFoundException(
        `Article with id '${articleId}' has no associated author.`,
      );
    }
    return {
      ...article,
      author: pick(author, 'displayName'),
    };
  }

  async paginatedArticles(
    query: any,
    where?: FindOptionsWhere<ArticleEntity>,
  ): Promise<ArticlesPaginatedResponseDto> {
    const { direction, take, page } = query;

    const [data, maxCount] = await this.articleRepository.findAndCount({
      where,
      order: {
        createdAt: {
          direction,
        },
      },
      skip: (page - 1) * take,
      take,
    });

    let articles: ArticlesPaginatedResponseDataDto[] = [];

    if (where?.createdBy) {
      const author: AuthorEntity =
        await this.authorService.repository.findOneBy({
          id: Equal(where.createdBy),
        });

      articles = await Promise.all(
        data.map(async (article: ArticleEntity) => {
          return {
            ...article,
            author: pick(author, 'displayName'),
          };
        }),
      );
    } else {
      articles = await Promise.all(
        data.map(async (article: ArticleEntity) => {
          const author: AuthorEntity =
            await this.authorService.repository.findOneBy({
              id: Equal(article.createdBy),
            });
          return {
            ...article,
            author: pick(author, 'displayName'),
          };
        }),
      );
    }

    return {
      meta: {
        hasPreviousPage: page > 1,
        hasNextPage: maxCount >= take * query.page,
        count: data.length,
      },
      data: articles,
    };
  }
}
